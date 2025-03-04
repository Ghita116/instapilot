from selenium import webdriver
from selenium.webdriver import Remote
from selenium.webdriver.chromium.remote_connection import ChromiumRemoteConnection
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
import time
from typing import Optional, Dict, Any
import os
from dotenv import load_dotenv

load_dotenv()

# Bright Data configuration
SBR_WEBDRIVER = os.getenv("BRIGHT_URL")


def setup_driver():
    """
    Set up and return a configured Remote WebDriver using Bright Data Scraping Browser
    """
    print("Connecting to Scraping Browser...")
    sbr_connection = ChromiumRemoteConnection(SBR_WEBDRIVER, "goog", "chrome")
    driver = Remote(sbr_connection, options=webdriver.ChromeOptions())
    print("Connected to Scraping Browser!")
    return driver


def scrape_instagram_profile(
    profile_url: str, num_posts: int = 10
) -> Optional[Dict[str, Any]]:
    """
    Scrape an Instagram profile using browser automation

    Args:
        profile_url (str): The Instagram profile URL to scrape
        num_posts (int): Number of posts to scrape (default: 10)

    Returns:
        Optional[Dict[str, Any]]: The scraping results if successful, None if failed
    """
    driver = None
    try:
        print(f"Starting to scrape profile: {profile_url}")
        driver = setup_driver()

        # Navigate to the profile
        driver.get(profile_url)
        time.sleep(5)  # Wait for page to load

        # Wait for the profile header to be present
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "header"))
        )

        # Get profile information
        profile_data = {
            "username": driver.find_element(By.CSS_SELECTOR, "h2").text,
            "posts": [],
        }

        # Scroll to load posts
        posts_loaded = 0
        last_height = driver.execute_script("return document.body.scrollHeight")

        while posts_loaded < num_posts:
            # Scroll down
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(2)

            # Get posts
            posts = driver.find_elements(By.CSS_SELECTOR, "article a")
            posts_loaded = len(posts)

            # Check if we've reached the bottom
            new_height = driver.execute_script("return document.body.scrollHeight")
            if new_height == last_height:
                break
            last_height = new_height

            print(f"Loaded {posts_loaded} posts...")

        # Get post data
        # First collect all post URLs and thumbnails
        post_data_list = []
        for post in posts[:num_posts]:
            try:
                post_url = post.get_attribute("href")
                thumbnail = post.find_element(By.CSS_SELECTOR, "img").get_attribute(
                    "src"
                )
                post_data_list.append({"url": post_url, "thumbnail": thumbnail})
            except Exception as e:
                print(f"Error collecting post data: {str(e)}")
                continue

        # Now process each post
        for post_info in post_data_list:
            try:
                # Navigate to the post URL
                driver.get(post_info["url"])
                time.sleep(2)  # Wait for post to load

                # Get the caption
                try:
                    caption = driver.find_element(By.XPATH, "//h1").get_attribute(
                        "innerHTML"
                    )
                except NoSuchElementException:
                    caption = ""

                post_data = {
                    "url": post_info["url"],
                    "thumbnail": post_info["thumbnail"],
                    "caption": caption,
                }
                profile_data["posts"].append(post_data)

                # Go back to profile
                driver.get(profile_url)
                time.sleep(2)  # Wait for profile to reload

            except Exception as e:
                print(f"Error getting post data: {str(e)}")
                continue

        return profile_data

    except Exception as e:
        print(f"Error during scraping: {str(e)}")
        return None

    finally:
        if driver:
            driver.quit()


# Example usage:
if __name__ == "__main__":
    result = scrape_instagram_profile("https://www.instagram.com/semrush/", num_posts=1)
    if result:
        print("Scraping completed successfully:")
        print(result)
    else:
        print("Scraping failed")
