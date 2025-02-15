
import { connectDB } from '@/lib/mongodb';
import { Expense } from '@/models/Expense';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const expenses = await Expense.find().populate('paidBy');
    return NextResponse.json(expenses);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch expenses' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await connectDB();
    const newExpense = new Expense(data);
    await newExpense.save();
    return NextResponse.json(newExpense);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create expense' },
      { status: 500 }
    );
  }
}