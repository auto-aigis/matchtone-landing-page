"use client";

import React, { useState } from 'react';
import { rewriteApi } from '@/app/_lib/api';
import { OpenerResponse } from '@/app/_lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RotateCcw } from 'lucide-react';

type Tone = 'Warm & Playful' | 'Confident & Direct' | 'Thoughtful & Genuine';

export default function OpenerPage() {
  const [input, setInput] = useState('');
  const [tone, setTone] = useState<Tone>('Warm & Playful');
  const [result, setResult] = useState<OpenerResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!input.trim()) {
      setError('Please enter a match profile to generate messages.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await rewriteApi.opener({ profile_text: input, tone });
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
        <h1 className="text-3xl font-bold text-gray-900">Opening Message Generator</h1>
        <p className="mt-2 text-gray-600">Paste their profile and get personalized opening messages.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Match&apos;s Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="profile-input">Paste their dating profile bio/prompts</Label>
            <Textarea
              id="profile-input"
              placeholder="Copy-paste their profile text here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={6}
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
            {loading ? 'Generating...' : 'Generate Openers'}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Personalized Opening Messages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {result.openers.map((opener, idx) => (
              <div key={idx} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">Option {idx + 1}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(opener)}
                  >
                    <Copy size={16} className="mr-1" /> Copy
                  </Button>
                </div>
                <p className="text-gray-900">{opener}</p>
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