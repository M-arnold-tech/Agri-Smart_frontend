import React, { useRef } from "react";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { BookOpen, Download, Search, FileText, Upload, Loader2, AlertCircle } from "lucide-react";
import useKnowledgeBase from "../../../hooks/useKnowledgeBase";

export const AdvisorKnowledge: React.FC = () => {
  const { resources, isLoading, uploadResource, refreshResources } = useKnowledgeBase();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", file.name.split(".")[0]); // Default title
    formData.append("type", file.type.includes("pdf") ? "PDF" : "GUIDE");

    const success = await uploadResource(formData);
    if (success) {
      if (fileInputRef.current) fileInputRef.current.value = "";
      refreshResources();
    }
  };

  const filteredResources = resources.filter(res => 
    res.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    res.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-text-main mb-1">
            Resource Library
          </h1>
          <p className="text-text-muted text-lg">
            Browse guides, manuals, and best practices available for farmers.
          </p>
        </div>
        <div className="flex items-center gap-4 flex-1 max-w-2xl">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
            />
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full pl-12 pr-4 py-3 bg-surface border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.doc,.docx,.txt"
          />
          <Button onClick={handleUploadClick} disabled={isLoading} className="shrink-0 rounded-xl">
            {isLoading ? <Loader2 size={18} className="animate-spin mr-2" /> : <Upload size={18} className="mr-2" />}
            Upload Resource
          </Button>
        </div>
      </header>

      {isLoading && resources.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-20 opacity-50">
          <Loader2 className="text-primary animate-spin mb-4" size={48} />
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Loading resources...</p>
        </div>
      ) : filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((res) => (
            <Card key={res.id} className="flex flex-col gap-4 p-8 group h-full" hoverable>
              <div className="w-14 h-14 rounded-xl bg-primary-bg flex items-center justify-center mb-2 shadow-inner group-hover:scale-110 transition-transform">
                {res.type === "PDF" ? <FileText size={28} className="text-primary" /> : <BookOpen size={28} className="text-secondary" />}
              </div>
              <h3 className="text-xl font-bold text-text-main line-clamp-2">
                {res.title}
              </h3>
              <p className="text-xs text-text-muted leading-relaxed flex-1 italic">
                {res.description || "Updated agronomy guide for seasonal planning."}
              </p>
              <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-2">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-text-light uppercase tracking-widest">
                    {res.type}
                  </span>
                  <span className="text-[9px] text-text-muted mt-0.5">
                    {new Date(res.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <a href={res.url} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-primary-bg text-primary"
                  >
                    <Download size={20} />
                  </Button>
                </a>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-20 text-center bg-white rounded-[40px] border-2 border-dashed border-gray-100">
           <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-200">
              <AlertCircle size={40} />
           </div>
           <h3 className="text-xl font-bold text-text-main mb-2">No Resources Found</h3>
           <p className="text-text-muted max-w-xs font-medium">Try searching for something else or upload a new guide to help your farmers.</p>
        </div>
      )}
    </div>
  );
};

