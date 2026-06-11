"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Heart,
  Sparkles,
  MessageCircle,
  Globe,
  CheckCircle,
  ArrowRight,
  Star,
  Zap,
  BookOpen,
  TrendingUp,
  Shield,
  Users,
} from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
}

interface Testimonial {
  name: string;
  country: string;
  flag: string;
  text: string;
  rating: number;
  app: string;
}

interface Step {
  number: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Sparkles className="w-6 h-6 text-pink-500" />,
    title: "Profile Bio Rewriting",
    description:
      "Paste your draft bio and get a natural, warm rewrite that sounds authentically you — not translated. We preserve your personality while removing culturally flat phrasing.",
  },
  {
    icon: <MessageCircle className="w-6 h-6 text-pink-500" />,
    title: "Opening Message Generator",
    description:
      "Generate personalized, witty opening messages based on your match's profile. No more generic openers — each message feels crafted and genuine.",
  },
  {
    icon: <Heart className="w-6 h-6 text-pink-500" />,
    title: "Ghosting Recovery Replies",
    description:
      "When conversations go cold, MatchTone suggests natural, re-engaging replies tailored to your conversation history and your match's profile.",
  },
  {
    icon: <BookOpen className="w-6 h-6 text-pink-500" />,
    title: "Learn Why It Works",
    description:
      "Every rewrite comes with an explanation of what changed and why. You don't just get better messages — you learn to write them yourself over time.",
  },
  {
    icon: <Globe className="w-6 h-6 text-pink-500" />,
    title: "Cultural Tone Calibration",
    description:
      "Optimized for Tinder, Bumble, and Hinge. Understands Western dating culture so your messages land with the right vibe — confident, warm, and real.",
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-pink-500" />,
    title: "Match Rate Tracking",
    description:
      "Track your improvement over time. See how your match rate changes as your profile and messages get sharper with every rewrite.",
  },
];

const steps: Step[] = [
  {
    number: "01",
    title: "Paste Your Text",
    description:
      "Drop in your profile bio, a conversation thread, or a message you want to send. No account setup — start in seconds.",
  },
  {
    number: "02",
    title: "AI Rewrites It",
    description:
      "Our NLP model trained on high-converting dating language rewrites your text in natural, culturally fluent English that sounds genuine.",
  },
  {
    number: "03",
    title: "Understand the Changes",
    description:
      "Read the explanation for every edit. Learn the nuances of Western dating language patterns so you improve with every use.",
  },
  {
    number: "04",
    title: "Get More Matches",
    description:
      "Copy your improved text, send it out, and watch your match rate climb. Users report 2–3x more matches within the first week.",
  },
];

const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "Try MatchTone risk-free",
    features: [
      "5 profile rewrites per month",
      "10 message generations",
      "Basic tone explanations",
      "Tinder & Bumble support",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "per month",
    description: "For serious daters",
    features: [
      "Unlimited profile rewrites",
      "Unlimited message generations",
      "Detailed tone explanations",
      "All dating apps supported",
      "Ghosting recovery replies",
      "Match rate analytics",
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Premium",
    price: "$19",
    period: "per month",
    description: "Maximum match potential",
    features: [
      "Everything in Pro",
      "1-on-1 coaching sessions",
      "Profile photo feedback",
      "Priority AI processing",
      "Custom tone profiles",
      "Early feature access",
    ],
    cta: "Go Premium",
    popular: false,
  },
];

const testimonials: Testimonial[] = [
  {
    name: "Arjun M.",
    country: "India",
    flag: "🇮🇳",
    text: "My bio was grammatically perfect but got zero matches. MatchTone rewrote it and explained every change. Within a week I had 3x more likes. This app understands the problem no one else talks about.",
    rating: 5,
    app: "Hinge",
  },
  {
    name: "Valentina C.",
    country: "Brazil",
    flag: "🇧🇷",
    text: "I knew my English was correct but something was always off. MatchTone showed me I was writing in a formal, translated style. Now my messages sound warm and natural. I actually enjoy dating apps now!",
    rating: 5,
    app: "Bumble",
  },
  {
    name: "Minh T.",
    country: "Vietnam",
    flag: "🇻🇳",
    text: "The ghosting recovery feature saved a conversation I thought was dead. The reply felt so natural and she responded immediately. Ended up going on 3 dates with her. Incredible tool.",
    rating: 5,
    app: "Tinder",
  },
];

const faqs = [
  {
    question: "Does MatchTone work for any native language background?",
    answer:
      "Yes! MatchTone is designed to help non-native English speakers from any language background. Whether your first language is Hindi, Portuguese, Vietnamese, Russian, or Arabic, our AI understands the common patterns that make text sound translated and rewrites it to sound naturally fluent.",
  },
  {
    question: "Will the rewrite still sound like me?",
    answer:
      "Absolutely. MatchTone is specifically trained to preserve your authentic personality, humor, and story — it only changes phrasing patterns that sound culturally flat or translated. You review every suggestion before using it.",
  },
  {
    question: "Which dating apps does MatchTone support?",
    answer:
      "MatchTone works with any text-based profile or conversation, so it supports Tinder, Bumble, Hinge, OkCupid, and any other dating platform. The Pro and Premium plans include app-specific tone optimization.",
  },
  {
    question: "How quickly will I see results?",
    answer:
      "Most users report noticeably more matches within the first 3–7 days of using an improved profile bio. Opening messages see even faster results — many users report replies within hours of using MatchTone-generated openers.",
  },
  {
    question: "Is my data kept private?",
    answer:
      "Your privacy is our priority. We do not store your conversations or profile text after processing. All data is encrypted in transit. We never share personal information with third parties.",
  },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">MatchTone</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                How It Works
              </a>
              <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Pricing
              </a>
              <a href="#faq" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                FAQ
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="hidden md:flex">
                Log in
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-pink-500 to-rose-600 text-white hover:from-pink-600 hover:to-rose-700 border-0"
              >
                Try Free
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-rose-50 pt-20 pb-24">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-pink-200 rounded-full opacity-20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-rose-200 rounded-full opacity-20 blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-pink-100 text-pink-700 hover:bg-pink-100 border-pink-200">
              <Sparkles className="w-3 h-3 mr-1" />
              AI Dating Coach for ESL Speakers
            </Badge>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
              Your English is correct.{" "}
              <span className="bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent">
                Your profile isn{"'"}t.
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto leading-relaxed">
              Non-native English speakers match{" "}
              <strong className="text-gray-900">40–60% less</strong> than native speakers — not because of grammar, but
              because of cultural tone. MatchTone fixes that.
            </p>
            <p className="text-lg text-gray-500 mb-10 max-w-xl mx-auto">
              AI rewrites your dating profile and messages to sound natural, warm, and irresistible — while keeping your
              authentic personality intact.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-rose-600 text-white hover:from-pink-600 hover:to-rose-700 border-0 text-base px-8 py-6 h-auto"
              >
                Rewrite My Profile Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 py-6 h-auto border-gray-300">
                See Examples
              </Button>
            </div>

            {/* Social proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["🇮🇳", "🇧🇷", "🇻🇳", "🇷🇺"].map((flag, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-sm"
                    >
                      {flag}
                    </div>
                  ))}
                </div>
                <span>
                  <strong className="text-gray-700">12,000+</strong> ESL daters improving daily
                </span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
                <span className="ml-1">
                  <strong className="text-gray-700">4.9/5</strong> average rating
                </span>
              </div>
            </div>
          </div>

          {/* Hero demo card */}
          <div className="mt-20 max-w-3xl mx-auto">
            <Tabs defaultValue="before">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-gray-500">Real profile transformation example:</p>
                <TabsList className="bg-gray-100">
                  <TabsTrigger value="before">Before</TabsTrigger>
                  <TabsTrigger value="after">After MatchTone</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="before">
                <Card className="border-red-200 bg-red-50/50">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sm">😐</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-red-700 mb-2">Original Bio (grammatically correct)</p>
                        <p className="text-gray-700 leading-relaxed">
                          {
                            "I am software engineer from Bangalore. I like to do hiking and cooking in my free time. I am looking for someone who is kind and honest. I enjoy watching movies and reading books. Please message me if you want to know more about me."
                          }
                        </p>
                      </div>
                    </div>
                    <div className="bg-red-100 rounded-lg p-3">
                      <p className="text-xs text-red-600 font-medium">
                        ⚠️ Problem: Reads like a translated resume. No personality, no warmth, no hooks. 3 matches in 2
                        weeks.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="after">
                <Card className="border-green-200 bg-green-50/50">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sm">✨</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-green-700 mb-2">MatchTone Rewrite</p>
                        <p className="text-gray-700 leading-relaxed">
                          {
                            "Software engineer by day, amateur chef experimenting with Bangalore street food recipes by night. I'll drag you on a weekend hike — but I promise the playlist is worth it. Big believer that the best conversations happen over a slow-cooked meal. If your movie taste can survive a 3-hour Bollywood epic, we'll get along great."
                          }
                        </p>
                      </div>
                    </div>
                    <div className="bg-green-100 rounded-lg p-3">
                      <p className="text-xs text-green-600 font-medium">
                        ✅ Result: Same person, same facts — but warm, specific, and inviting. 23 matches in the first
                        week.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-gray-950 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">The invisible disadvantage</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Non-native English speakers aren{"'"}t failing at dating apps because of their personality. They{"'"}re
              failing because the tools assume you already write like a native.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                stat: "40–60%",
                label: "Fewer matches",
                description:
                  "ESL singles match significantly less than native speakers on Western dating apps — for language reasons alone, not attractiveness.",
              },
              {
                stat: "0",
                label: "Dedicated tools",
                description:
                  "Zero existing AI dating tools account for cultural tone differences or offer non-native speaker rewrites. They all assume fluency.",
              },
              {
                stat: "2–3x",
                label: "Match improvement",
                description:
                  "MatchTone users report doubling or tripling their match rates within the first week of using an AI-rewritten profile.",
              },
            ].map((item, i) => (
              <div key={i} className="text-center p-8 rounded-2xl bg-gray-900 border border-gray-800">
                <div className="text-5xl font-extrabold bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent mb-2">
                  {item.stat}
                </div>
                <div className="text-lg font-semibold text-white mb-3">{item.label}</div>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-pink-100 text-pink-700 hover:bg-pink-100 border-pink-200">Features</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to match more
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              MatchTone is built specifically for non-native English speakers — not a generic AI writing tool with dating
              templates bolted on.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <Card key={i} className="border-gray-200 hover:border-pink-200 hover:shadow-md transition-all duration-200">
                <CardHeader>
                  <div className="w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center mb-3">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-500 leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-gradient-to-br from-pink-50 to-rose-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-pink-100 text-pink-700 hover:bg-pink-100 border-pink-200">How It Works</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">From awkward to irresistible in minutes</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              No learning curve, no complicated setup. Paste your text and get results that actually work.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-white rounded-2xl p-6 border border-pink-100 shadow-sm h-full">
                  <div className="text-4xl font-extrabold text-pink-100 mb-4">{step.number}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-5 h-5 text-pink-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-pink-100 text-pink-700 hover:bg-pink-100 border-pink-200">Stories</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Real matches. Real people.</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              From Bangalore to São Paulo to Hanoi — MatchTone is helping ESL singles find real connections.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className="border-gray-200 shadow-sm">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center text-2xl">
                      {testimonial.flag}
                    </div>
                    <div>
                      <CardTitle className="text-base">{testimonial.name}</CardTitle>
                      <CardDescription>
                        {testimonial.country} {"·"} {testimonial.app}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-1 mt-2">
                    {Array.from({ length: testimonial.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed">{`"${testimonial.text}"`}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-pink-900 text-pink-300 hover:bg-pink-900 border-pink-800">Pricing</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Simple, honest pricing</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Start free, upgrade when you{"'"}re ready. Cancel anytime — no contracts, no tricks.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {pricingPlans.map((plan, i) => (
              <Card
                key={i}
                className={`relative ${
                  plan.popular
                    ? "border-pink-500 bg-gradient-to-b from-pink-950 to-gray-900 shadow-pink-500/20 shadow-xl scale-105"
                    : "border-gray-800 bg-gray-900"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0 px-4">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-white text-xl">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-400">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-5xl font-extrabold text-white">{plan.price}</span>
                    <span className="text-gray-400 ml-2">/{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-pink-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white border-0"
                        : "bg-gray-800 text-gray-100 hover:bg-gray-700 border-gray-700"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="flex items-center justify-center gap-6 mt-12 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              No credit card required for free
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Cancel anytime instantly
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              12,000+ active users
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-pink-100 text-pink-700 hover:bg-pink-100 border-pink-200">FAQ</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Common questions</h2>
          </div>
          <Accordion className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left font-medium text-gray-900">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-500 leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Separator />

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-pink-500 to-rose-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Heart className="w-8 h-8 text-white fill-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Stop losing matches to language. Start connecting.
          </h2>
          <p className="text-pink-100 text-lg mb-10 max-w-2xl mx-auto">
            Your personality is amazing. Your story is worth hearing. MatchTone makes sure the right words finally do
            it justice — so the people you want to meet actually swipe right.
          </p>
          {submitted ? (
            <div className="inline-flex items-center gap-3 bg-white/20 rounded-xl px-8 py-4">
              <CheckCircle className="w-6 h-6 text-white" />
              <span className="text-white font-semibold text-lg">You{"'"}re on the list! We{"'"}ll be in touch soon.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/20 border-white/30 text-white placeholder:text-pink-200 focus:bg-white/30 h-12"
              />
              <Button
                type="submit"
                size="lg"
                className="bg-white text-pink-600 hover:bg-pink-50 border-0 font-semibold px-8 h-12 flex-shrink-0"
              >
                Get Early Access
              </Button>
            </form>
          )}
          <p className="text-pink-200 text-sm mt-4">Free forever plan available. No credit card needed.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-gradient-to-br from-pink-500 to-rose-600 rounded-md flex items-center justify-center">
                <Heart className="w-3.5 h-3.5 text-white fill-white" />
              </div>
              <span className="text-white font-semibold">MatchTone</span>
              <span className="text-gray-600 text-sm ml-2">{"·"} AI dating coach for ESL speakers</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Support
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Blog
              </a>
            </div>
          </div>
          <Separator className="my-8 bg-gray-800" />
          <p className="text-center text-sm text-gray-600">
            {"© 2024 MatchTone. Made with"}{" "}
            <Heart className="w-3 h-3 text-pink-500 fill-pink-500 inline-block" />{" "}
            {"for ESL singles everywhere."}
          </p>
        </div>
      </footer>
    </div>
  );
}