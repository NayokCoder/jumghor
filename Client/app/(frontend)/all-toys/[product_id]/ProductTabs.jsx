import { useState } from "react";
import { Star } from "lucide-react";

const ProductTabs = ({ toy }) => {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { id: "description", label: "Description" },
    { id: "specifications", label: "Specifications" },
    { id: "reviews", label: "Reviews" },
  ];

  return (
    <div className="mt-12 space-y-6">
      {/* Tab navigation */}
      <div className="flex gap-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id ? "border-indigo-500 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="py-4">
        {activeTab === "description" && (
          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Description</h3>
            <p className="text-gray-600 leading-relaxed">{toy.description || "This amazing toy provides hours of entertainment and educational value. Crafted with care and attention to detail, it's perfect for children of all ages. Made from high-quality, safe materials, this toy meets all safety standards and is built to last."}</p>

            <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Key Benefits:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Promotes creativity and imagination</li>
              <li>Enhances fine motor skills</li>
              <li>Safe and non-toxic materials</li>
              <li>Durable construction for long-lasting play</li>
              <li>Educational value for cognitive development</li>
            </ul>
          </div>
        )}

        {activeTab === "specifications" && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Product Details</h4>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Brand:</dt>
                    <dd className="font-medium">{toy.brand || "Premium Toys"}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Age Range:</dt>
                    <dd className="font-medium">{toy.age_range || "3+ years"}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Material:</dt>
                    <dd className="font-medium">{toy.material || "Safe Plastic"}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Weight:</dt>
                    <dd className="font-medium">{toy.weight || "0.5 lbs"}</dd>
                  </div>
                </dl>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Safety & Care</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• CE marked for European safety standards</li>
                  <li>• CPSC compliant for US safety</li>
                  <li>• Clean with mild soap and water</li>
                  <li>• Store in dry place when not in use</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">Customer Reviews</h3>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">Write a Review</button>
            </div>

            <div className="space-y-4">
              {/* Sample reviews */}
              {[
                { name: "Sarah M.", rating: 5, comment: "Amazing quality! My kids love it and it's held up well over months of play.", date: "2 weeks ago" },
                { name: "Mike R.", rating: 4, comment: "Great toy, exactly as described. Fast shipping too!", date: "1 month ago" },
                { name: "Lisa K.", rating: 5, comment: "Perfect gift for my nephew. Educational and fun!", date: "2 months ago" },
              ].map((review, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">{review.name}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProductTabs;
