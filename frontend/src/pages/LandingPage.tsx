import React from "react";
import { useNavigate } from "react-router";

export default function LandingPage() {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold tracking-tight">
          Team<span className="text-indigo-400">Track</span>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/login')} className="px-4 py-2 rounded-md text-slate-300 hover:text-white transition">
            Login
          </button>
          <button onClick={() => navigate('/signup')} className="px-5 py-2 rounded-md bg-indigo-500 hover:bg-indigo-600 transition font-medium">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-24 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="text-5xl font-extrabold leading-tight">
            Track work.
            <br />
            Ship faster.
            <br />
            <span className="text-indigo-400">Stay aligned.</span>
          </h1>

          <p className="mt-6 text-lg text-slate-300 max-w-xl">
            Team Track is a lightweight project management tool inspired by Jira.
            Organize projects into sprints, break work into tasks, and collaborate
            with your team effortlessly.
          </p>

          <div className="mt-8 flex gap-4">
            <button onClick={() => navigate('/login')} className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-md font-semibold transition">
              Get Started
            </button>
          </div>
        </div>

        {/* Hero Card */}
        <div className="bg-slate-800/60 backdrop-blur rounded-xl p-6 shadow-xl border border-slate-700">
          <div className="space-y-4">
            <Card title="📦 Project">
              One workspace for each team or product.
            </Card>
            <Card title="🚀 Sprint">
              Time-boxed sprints to plan and execute work.
            </Card>
            <Card title="✅ Tasks">
              Assign, track, and move tasks like a real Jira board.
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything your team needs
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <Feature
            title="Project → Sprint → Tasks"
            description="Clear hierarchy that mirrors real agile workflows."
          />
          <Feature
            title="Team Invites"
            description="Invite teammates and collaborate in real time."
          />
          <Feature
            title="Jira-like Experience"
            description="Familiar UX with a simpler, faster learning curve."
          />
          <Feature
            title="Role-based Access"
            description="Control who can manage projects and tasks."
          />
          <Feature
            title="Status Tracking"
            description="Move tasks across states and track progress visually."
          />
          <Feature
            title="Modern Tech Stack"
            description="Built with React, Node.js, MongoDB for speed and scale."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-500/10 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-8 py-20 text-center">
          <h2 className="text-4xl font-bold">
            Ready to track your team better?
          </h2>
          <p className="mt-4 text-slate-300 text-lg">
            Start managing projects the smart way with Team Track.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <button onClick={() => navigate('/signup')} className="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-md font-semibold transition">
              Create Free Account
            </button>
            <button onClick={() => navigate('/login')} className="px-8 py-3 border border-slate-600 rounded-md hover:bg-slate-800 transition">
              Login
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-400 text-sm">
        © {new Date().getFullYear()} Team Track. All rights reserved.
      </footer>
    </div>
  );
}

/* ----------------- Components ----------------- */

function Feature( {
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-6 hover:border-indigo-500 transition">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-slate-300">{description}</p>
    </div>
  );
}

function Card({title, children} : {title : string, children : React.ReactNode}) {
  return (
    <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-4">
      <h4 className="font-semibold mb-1">{title}</h4>
      <p className="text-slate-300 text-sm">{children}</p>
    </div>
  );
}
