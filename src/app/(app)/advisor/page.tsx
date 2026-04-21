import { ChatWindow } from '@/components/chat/chat-window'
import { Sparkle, ListPlus, ClockCounterClockwise } from '@phosphor-icons/react/dist/ssr'

export default function AdvisorPage() {
  return (
    <main className="min-h-screen bg-linen pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar (Session Info / Tips) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-border rounded-r-xl p-8 shadow-sm">
            <h1 className="type-section text-ink mb-2">Career Advisor</h1>
            <p className="type-body text-ink-50 mb-8">Discuss your trajectory with Gemini 2.0 Flash.</p>
            
            <div className="space-y-4">
              <div className="p-4 bg-parchment rounded-r-md border border-border flex gap-4 transition-standard hover:border-ink/20 group">
                <Sparkle size={24} className="text-volt group-hover:scale-110 transition-micro" />
                <div>
                  <p className="type-body text-sm font-bold text-ink">Smart Matching</p>
                  <p className="type-caption text-ink-50">Paths are ranked based on your profile skills.</p>
                </div>
              </div>
              
              <div className="p-4 bg-parchment rounded-r-md border border-border flex gap-4 transition-standard hover:border-ink/20 group">
                <ListPlus size={24} className="text-azure group-hover:scale-110 transition-micro" />
                <div>
                  <p className="type-body text-sm font-bold text-ink">Resource Aggregator</p>
                  <p className="type-caption text-ink-50">Relevant courses will appear as you chat.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-night text-linen border border-ink-80 rounded-r-xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="type-card-title text-sm uppercase tracking-widest text-volt">Recent Chats</h3>
              <ClockCounterClockwise size={20} className="text-ink-50" />
            </div>
            <div className="space-y-3">
              {['Software Eng Roadmap', 'Freelancing with Canva', 'UI/UX Courses'].map((chat, i) => (
                <div key={i} className="type-body text-sm p-3 border border-ink-80 rounded-r-sm hover:bg-white/5 cursor-pointer transition-micro">
                  {chat}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="lg:col-span-8">
          <ChatWindow />
        </div>

      </div>
    </main>
  )
}
