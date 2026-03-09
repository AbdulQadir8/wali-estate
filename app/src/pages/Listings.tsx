import { useState, useEffect } from 'react';
import { Search, Filter, Grid3X3, List, X } from 'lucide-react';
import { MainLayout } from '@/layouts/MainLayout';
import { PropertyCard } from '@/components/PropertyCard';
import { SectionTitle } from '@/components/SectionTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { propertiesApi, type Property } from '@/lib/api';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export function Listings() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedType, setSelectedType] = useState<'all' | 'sale' | 'rent'>('all');
  const [showHotOnly, setShowHotOnly] = useState(false);
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Static filter options
  const categories = ['All', 'Residential Plots', 'Commercial Plots', 'Houses', 'Apartments', 'Villas', 'Files'];
  const locations = ['All', 'Phase 1', 'Phase 2', 'Phase 3', 'Phase 4', 'Phase 5', 'Phase 6', 'Phase 7', 'Phase 8', 'Phase 9'];

  // Fetch properties from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await propertiesApi.getProperties({
          search: searchQuery || undefined,
          property_type: selectedType !== 'all' ? selectedType : undefined,
          category: selectedCategory !== 'All' ? selectedCategory : undefined,
          phase: selectedLocation !== 'All' ? selectedLocation : undefined,
          is_hot: showHotOnly || undefined,
          is_new: showNewOnly || undefined,
          page_size: 100,
        });
        setProperties(response.items);
      } catch (err) {
        setError('Failed to load properties. Please try again.');
        console.error('Error fetching properties:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [searchQuery, selectedCategory, selectedLocation, selectedType, showHotOnly, showNewOnly]);

  const filteredListings = properties;

  const activeFiltersCount = [
    selectedCategory !== 'All',
    selectedLocation !== 'All',
    selectedType !== 'all',
    showHotOnly,
    showNewOnly,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedLocation('All');
    setSelectedType('all');
    setShowHotOnly(false);
    setShowNewOnly(false);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search properties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location
        </label>
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger>
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Property Type
        </label>
        <Select value={selectedType} onValueChange={(value: any) => setSelectedType(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="sale">For Sale</SelectItem>
            <SelectItem value="rent">For Rent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Checkboxes */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Features
        </label>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="hot" 
            checked={showHotOnly}
            onCheckedChange={(checked) => setShowHotOnly(checked as boolean)}
          />
          <label 
            htmlFor="hot"
            className="text-sm text-gray-600 cursor-pointer"
          >
            Hot Listings Only
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="new" 
            checked={showNewOnly}
            onCheckedChange={(checked) => setShowNewOnly(checked as boolean)}
          />
          <label 
            htmlFor="new"
            className="text-sm text-gray-600 cursor-pointer"
          >
            New Listings Only
          </label>
        </div>
      </div>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button 
          variant="outline" 
          className="w-full"
          onClick={clearFilters}
        >
          <X className="w-4 h-4 mr-2" />
          Clear Filters ({activeFiltersCount})
        </Button>
      )}
    </div>
  );

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <a href="/" className="hover:text-gold transition-colors">Home</a>
              <span>/</span>
              <span className="text-gray-900">Listings</span>
            </div>
            <SectionTitle
              title="Property Listings"
              subtitle="Find Your Dream Property"
              centered={false}
            />
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">{filteredListings.length}</span> Properties
              </p>
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="bg-gold/10 text-gold">
                  {activeFiltersCount} Filter{activeFiltersCount > 1 ? 's' : ''} Active
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <span className="ml-2 w-5 h-5 rounded-full bg-gold text-black text-xs flex items-center justify-center">
                        {activeFiltersCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px]">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>

              {/* View Mode Toggle */}
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-gold text-black' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-gold text-black' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex gap-8">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h3 className="font-display text-lg uppercase tracking-wider mb-6">
                  Filters
                </h3>
                <FilterContent />
              </div>
            </aside>

            {/* Listings Grid */}
            <div className="flex-1">
              {loading ? (
                <div className="text-center py-20 bg-white rounded-xl">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center animate-pulse">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">Loading properties...</p>
                </div>
              ) : error ? (
                <div className="text-center py-20 bg-white rounded-xl">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                    <X className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="font-display text-xl text-gray-900 mb-2">
                    Error Loading Properties
                  </h3>
                  <p className="text-gray-500 mb-6">{error}</p>
                  <Button onClick={() => window.location.reload()} variant="outline">
                    Retry
                  </Button>
                </div>
              ) : filteredListings.length > 0 ? (
                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                  {filteredListings.map((listing) => (
                    <PropertyCard
                      key={listing.id}
                      property={listing}
                      view={viewMode}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-xl">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="font-display text-xl text-gray-900 mb-2">
                    No properties found
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Try adjusting your filters or search query
                  </p>
                  <Button onClick={clearFilters} variant="outline">
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
