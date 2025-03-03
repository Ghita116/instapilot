import Link from "next/link"
import { ArrowRight, Instagram, Search, TrendingUp, Video } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center py-6">
          <div className="flex items-center gap-2">
            <Instagram className="h-6 w-6" />
            <h1 className="text-xl font-medium tracking-tight">InstaPilot</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              How it works
            </Link>
            <Button
              variant="outline"
              className="text-sm border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
            >
              Sign in
            </Button>
          </nav>
        </header>

        <main className="py-12 md:py-24">
          <section className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Analyze Instagram profiles for better engagement
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Paste any Instagram profile URL to get content insights, discover new areas to explore, and receive
              recommendations to improve engagement.
            </p>

            <div className="max-w-xl mx-auto mt-8 relative">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Paste Instagram profile URL"
                    className="pl-10 bg-zinc-900 border-zinc-800 text-white h-12 w-full"
                  />
                </div>
                <Button className="h-12 px-6">
                  Analyze
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </section>

          <section className="mt-24 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
              <div className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-zinc-400" />
              </div>
              <h3 className="text-xl font-medium mb-2">Content Analysis</h3>
              <p className="text-zinc-400">Get a detailed summary of the type of content and posting patterns.</p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
              <div className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-zinc-400" />
              </div>
              <h3 className="text-xl font-medium mb-2">Engagement Insights</h3>
              <p className="text-zinc-400">Discover what content performs best and how to improve engagement.</p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
              <div className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
                <Video className="h-6 w-6 text-zinc-400" />
              </div>
              <h3 className="text-xl font-medium mb-2">Video Analysis</h3>
              <p className="text-zinc-400">Watch their videos and get specific feedback to improve video content.</p>
            </div>
          </section>
        </main>

        <section className="py-16 border-t border-zinc-900">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">See InstaPilot in action</h2>
            <div className="aspect-video bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-center">
              <div className="text-zinc-500 flex flex-col items-center">
                <Video className="h-12 w-12 mb-2" />
                <p>Demo video placeholder</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

