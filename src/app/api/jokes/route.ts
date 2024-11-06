import { NextResponse } from 'next/server';
import connectToDatabase from '@/app/lib/mongodb';
import Joke from '@/app/models/jokes';

export async function GET() {
  await connectToDatabase();
  const jokes = await Joke.find({});
  return NextResponse.json(jokes);
}

export async function POST(request: Request) {
  await connectToDatabase();
  const { text, author } = await request.json();

  if (!text || !author) {
    return NextResponse.json({ message: 'Text and author are required' }, { status: 400 });
  }

  const newJoke = new Joke({ text, author });
  await newJoke.save();

  return NextResponse.json(newJoke, { status: 201 });
}