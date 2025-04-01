import { useState, useEffect } from 'react'
import InputBox from "../components/Input";
import useCurrencyInfo from "../Hooks/usecurrencyinfo";
function App() {
    const [amount, setAmount] = useState(0);
    const [from, setFrom] = useState("USD");
    const [to, setTo] = useState("INR");
    const [convertedAmount, setConvertedAmount] = useState(0);

    const currencyInfo = useCurrencyInfo(from);
    const options = currencyInfo ? Object.keys(currencyInfo) : [];

    const convert = () => {
        if (currencyInfo && currencyInfo[to]) {
            setConvertedAmount(amount * currencyInfo[to]);
        } else {
            setConvertedAmount(0);
        }
    };

    const swap = () => {
        setFrom((prevFrom) => {
            setTo(prevFrom);
            return to;
        });

        setAmount((prevAmount) => {
            setConvertedAmount(prevAmount);
            return convertedAmount;
        });
    };

    return (
        <div
            className="w-full min-h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat bg-center bg-fixed relative overflow-hidden"
            style={{
                backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/013/087/516/non_2x/diagonal-golden-line-glass-cube-on-black-background-illustration-of-website-banner-poster-sign-corporate-business-social-media-post-billboard-agency-advertising-media-motion-video-animation-wave-vector.jpg')`,
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100vh',
                width: '100vw'
            }}
        >
            {/* Very light overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-blue-900/10"></div>
            
            {/* Main container - centered both vertically and horizontally */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-4">
                <div className="w-full backdrop-blur-sm bg-white/10 p-6 rounded-3xl border border-white/20">
                    {/* Glass effect border */}
                    <div className="absolute inset-0 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent"></div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                        <h1 className="text-3xl font-bold text-white mb-8 text-center tracking-wide drop-shadow-lg">Currency Converter</h1>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                convert();
                            }}
                            className="space-y-6"
                        >
                            <div className="backdrop-blur-sm bg-white/5 p-4 rounded-2xl border border-white/20">
                                <InputBox
                                    label="From"
                                    amount={amount}
                                    currencyOption={options}
                                    onCurrencyChange={(currency) => setFrom(currency)}
                                    selectCurrency={from}
                                    onAmountChange={(amount) => setAmount(amount)}
                                />
                            </div>
                            
                            <div className="relative w-full flex justify-center h-0">
                                <button
                                    type="button"
                                    className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md text-white px-8 py-3 rounded-xl shadow-lg hover:bg-white/20 hover:scale-105 transition-all duration-300 font-medium z-10 border border-white/30"
                                    onClick={swap}
                                >
                                    ⇅ Swap
                                </button>
                            </div>
                            
                            <div className="backdrop-blur-sm bg-white/5 p-4 rounded-2xl border border-white/20 mt-6">
                                <InputBox
                                    label="To"
                                    amount={convertedAmount}
                                    currencyOption={options}
                                    onCurrencyChange={(currency) => setTo(currency)}
                                    selectCurrency={to}
                                    amountDisable
                                />
                            </div>
                            
                            <button 
                                type="submit" 
                                className="w-full bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-[1.02] font-semibold text-lg shadow-xl border border-white/30 mt-6"
                            >
                                Convert {from.toUpperCase()} to {to.toUpperCase()}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
