"use client";

import React, { useState } from 'react';
import { rewriteApi } from '@/app/_lib/api';
import { CoachResponse } from '@/app/_lib/types';
import { useAuth } from '@/app/_lib/hooks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RotateCcw, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Tone = 'Warm & Playful' | 'Confident & Direct' | 'Thoughtful & Genuine';

export default function CoachPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [input, setInput] = useState('');
  const [tone, setTone] = useState<Tone>('Warm & Playful');
  const [result, setResult] = useState<CoachResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (user?.tier === 'free') {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Lock size={48} className="mb-4 text-amber-600" />
            <h2 className="text-2xl font-bold text-amber-900">Feature Locked</h2>
            <p className="mt-2 text-amber-800">Conversation Coach is available on Spark and Coach tiers.</p>
            <Button
              onClick={() => router.push('/pricing')}
              className="mt-4 bg-amber-600 text-white hover:bg-amber-700"
            >
              Upgrade Now
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleGenerate = async () => {
    if (!input.trim()) {
      setError('Please enter a conversation to get reply suggestions.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await rewriteApi.coach({ conversation_text: input, tone });
      setResult(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Generation failed');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Conversation Coach</h1>
        <p className="mt-2 text-gray-600">Get natural reply suggestions to keep the conversation flowing.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Paste Your Conversation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="convo-input">Conversation Thread</Label>
            <Textarea
              id="convo-input"
              placeholder="Paste the conversation so far (copy-paste from the dating app)..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={8}
              className="mt-2 resize-none"
            />
          </div>

          <div>
            <Label htmlFor="tone-select">Tone Preference</Label>
            <Select value={tone} onValueChange={(v) => setTone(v as Tone)}>
              <SelectTrigger id="tone-select" className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Warm & Playful">Warm & Playful</SelectItem>
                <SelectItem value="Confident & Direct">Confident & Direct</SelectItem>
                <SelectItem value="Thoughtful & Genuine">Thoughtful & Genuine</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <Button
            onClick={handleGenerate}
            disabled={loading || !input.trim()}
            className="w-full"
          >
            {loading ? 'Generating...' : 'Get Reply Suggestions'}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Reply Suggestions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {result.replies.map((reply, idx) => (
              <div key={idx} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">Option {idx + 1}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(reply)}
                  >
                    <Copy size={16} className="mr-1" /> Copy
                  </Button>
                </div>
                <p className="text-gray-900">{reply}</p>
              </div>
            ))}

            <Button
              onClick={handleGenerate}
              variant="outline"
              className="w-full"
            >
              <RotateCcw size={16} className="mr-2" /> Regenerate
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}