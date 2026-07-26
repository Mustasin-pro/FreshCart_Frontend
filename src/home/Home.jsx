import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Hero from "../components/homeComponents/Hero";
import Foods from "../components/homeComponents/Foods";
import FlashSaleSection from "../components/homeComponents/FlashSaleSection";

const Home = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Navbar */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4">
                    <Navbar />
                </div>
            </div>

            {/* Main Content Layout */}
            <main className="max-w-7xl mx-auto px-4 ">
                <div className="space-y-8 w-full overflow-hidden">
                    {/* Hero Banner Slider */}
                    <div className=" overflow-hidden shadow-sm">
                        <Hero />
                    </div>

                    {/* Flash Sales Section */}
                    <FlashSaleSection /> 

                    {/* Top Products Section */}
                    <Foods /> 

                    {/* Category Overview Section */}
                   
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-12">
                <div className="max-w-7xl mx-auto px-4">
                    <Footer />
                </div>
            </footer>
        </div>
    );
};

export default Home;