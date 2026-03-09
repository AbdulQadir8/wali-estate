import { MainLayout } from "@/layouts/MainLayout";
import { AgentCard } from "@/components/AgentCard";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Search, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useMemo, useEffect } from "react";
import { agentsApi, type Agent } from "@/lib/api";

export function Agents() {
  const [searchQuery, setSearchQuery] = useState("");
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await agentsApi.getAgents();
        setAgents(data);
      } catch (err) {
        setError("Failed to load agents.");
        console.error("Error fetching agents:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  const filteredAgents = useMemo(() => {
    return agents.filter(
      (agent) =>
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.specialties.some((s) =>
          s.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
    );
  }, [agents, searchQuery]);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block font-display text-sm uppercase tracking-[0.3em] text-gold mb-6">
              Our Team
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Meet Our <span className="text-gold">Experts</span>
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Our team of experienced professionals is dedicated to helping you
              navigate the DHA real estate market with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center">
                <Users className="w-7 h-7 text-gold" />
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-gray-900">
                  {agents.length}
                </p>
                <p className="text-sm text-gray-500">Expert Agents</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center">
                <span className="font-display text-xl font-bold text-gold">
                  {agents.reduce((acc, agent) => acc + agent.listingsCount, 0)}
                </span>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-gray-900">
                  {agents.reduce((acc, agent) => acc + agent.listingsCount, 0)}+
                </p>
                <p className="text-sm text-gray-500">Active Listings</p>
              </div>
            </div>
            <div className="flex-1 max-w-md w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search agents by name or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agents Grid */}
      <section ref={ref} className="py-20 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredAgents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAgents.map((agent, index) => (
                <div
                  key={agent.id}
                  className={`
                    transition-all duration-700
                    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
                  `}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <AgentCard agent={agent} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-display text-xl text-gray-900 mb-2">
                No agents found
              </h3>
              <p className="text-gray-500">Try adjusting your search query</p>
            </div>
          )}
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Want to Join Our Team?
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            We're always looking for talented individuals who are passionate
            about real estate. If you're interested in joining WALI Estate, we'd
            love to hear from you.
          </p>
          <a href="/contact" className="btn-primary">
            Contact Us
          </a>
        </div>
      </section>
    </MainLayout>
  );
}
