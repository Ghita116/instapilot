import Link from "next/link"
import { ArrowLeft, BarChart2, Compass, Instagram, MessageSquare, ThumbsUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

export default function ResultsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center py-6">
          <div className="flex items-center gap-2">
            <Instagram className="h-6 w-6" />
            <h1 className="text-xl font-medium tracking-tight">InstaPilot</h1>
          </div>
          <Button
            variant="outline"
            className="text-sm border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
          >
            Sign in
          </Button>
        </header>

        <div className="py-4">
          <Button variant="ghost" size="sm" className="text-zinc-400" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </Button>
        </div>

        <main className="py-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-1">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle>Profile Summary</CardTitle>
                  <CardDescription className="text-zinc-400">@fashionbrand</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-16 w-16 rounded-full bg-zinc-800 flex items-center justify-center">
                      <Instagram className="h-8 w-8 text-zinc-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">Fashion Brand</h3>
                      <p className="text-sm text-zinc-400">Fashion & Lifestyle</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Engagement Rate</span>
                        <span className="text-zinc-400">4.2%</span>
                      </div>
                      <Progress value={42} className="h-2 bg-zinc-800" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Content Quality</span>
                        <span className="text-zinc-400">7.8/10</span>
                      </div>
                      <Progress value={78} className="h-2 bg-zinc-800" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Posting Consistency</span>
                        <span className="text-zinc-400">6.5/10</span>
                      </div>
                      <Progress value={65} className="h-2 bg-zinc-800" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2 space-y-8">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle>Content Analysis</CardTitle>
                  <CardDescription className="text-zinc-400">Summary of content types and performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Content Types</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="bg-zinc-800 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span>Product Showcases</span>
                            <span className="text-sm text-zinc-400">45%</span>
                          </div>
                          <Progress value={45} className="h-2 bg-zinc-700" />
                        </div>
                        <div className="bg-zinc-800 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span>Lifestyle Content</span>
                            <span className="text-sm text-zinc-400">30%</span>
                          </div>
                          <Progress value={30} className="h-2 bg-zinc-700" />
                        </div>
                        <div className="bg-zinc-800 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span>Behind the Scenes</span>
                            <span className="text-sm text-zinc-400">15%</span>
                          </div>
                          <Progress value={15} className="h-2 bg-zinc-700" />
                        </div>
                        <div className="bg-zinc-800 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span>User Generated</span>
                            <span className="text-sm text-zinc-400">10%</span>
                          </div>
                          <Progress value={10} className="h-2 bg-zinc-700" />
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-zinc-800" />

                    <div>
                      <h3 className="text-lg font-medium mb-4">New Areas to Explore</h3>
                      <div className="bg-zinc-800 p-4 rounded-lg flex items-start gap-4">
                        <Compass className="h-5 w-5 text-zinc-400 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Sustainability Stories</h4>
                          <p className="text-sm text-zinc-400 mt-1">
                            Your audience shows interest in sustainable fashion. Create content highlighting your
                            eco-friendly practices and materials.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                  <CardDescription className="text-zinc-400">5 ways to improve engagement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-4 p-3 bg-zinc-800 rounded-lg">
                      <div className="h-8 w-8 rounded-full bg-zinc-700 flex items-center justify-center shrink-0">
                        <ThumbsUp className="h-4 w-4 text-zinc-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">Increase video content</h4>
                        <p className="text-sm text-zinc-400 mt-1">
                          Videos receive 2.1x more engagement than static posts. Aim for 3-4 videos per week.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 p-3 bg-zinc-800 rounded-lg">
                      <div className="h-8 w-8 rounded-full bg-zinc-700 flex items-center justify-center shrink-0">
                        <MessageSquare className="h-4 w-4 text-zinc-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">Improve caption strategy</h4>
                        <p className="text-sm text-zinc-400 mt-1">
                          Posts with questions in captions get 50% more comments. Include a clear call-to-action.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 p-3 bg-zinc-800 rounded-lg">
                      <div className="h-8 w-8 rounded-full bg-zinc-700 flex items-center justify-center shrink-0">
                        <BarChart2 className="h-4 w-4 text-zinc-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">Optimize posting times</h4>
                        <p className="text-sm text-zinc-400 mt-1">
                          Your audience is most active between 6-8pm. Shift your posting schedule to this timeframe.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 p-3 bg-zinc-800 rounded-lg">
                      <div className="h-8 w-8 rounded-full bg-zinc-700 flex items-center justify-center shrink-0">
                        <Instagram className="h-4 w-4 text-zinc-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">Leverage Instagram Stories</h4>
                        <p className="text-sm text-zinc-400 mt-1">
                          Your Stories get high completion rates. Use them for product teasers and behind-the-scenes
                          content.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 p-3 bg-zinc-800 rounded-lg">
                      <div className="h-8 w-8 rounded-full bg-zinc-700 flex items-center justify-center shrink-0">
                        <ThumbsUp className="h-4 w-4 text-zinc-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">Collaborate with micro-influencers</h4>
                        <p className="text-sm text-zinc-400 mt-1">
                          Identify 5-10 micro-influencers in your niche for potential collaborations to expand reach.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

