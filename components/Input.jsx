import React, { useId } from "react";

function InputBox({ 
    label, 
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOption = [],
    selectCurrency = "USD",
    amountDisable = false,
    currencyDisabled = false,
    className = "" 
}) {
    const amountInputId = useId();

    return (
        <div className={`bg-transparent p-3 rounded-lg text-sm flex ${className}`}>
            <div className="w-1/2">
                <label htmlFor={amountInputId} className="text-white/80 mb-2 inline-block font-medium">
                    {label}
                </label>
                <input
                    id={amountInputId}
                    className="outline-none w-full bg-transparent py-1.5 text-white placeholder-white/50"
                    type="number"
                    min="0"
                    placeholder="Amount"
                    disabled={amountDisable}
                    value={amount === 0 ? "0" : amount}
                    onChange={(e) => {
                        const val = e.target.value;
                        if (val >= 0) {
                            onAmountChange && onAmountChange(val === "" ? 0 : Number(val));
                        }
                    }}
                />
            </div>
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-white/80 mb-2 w-full font-medium">Currency Type</p>
                <select
                    className="rounded-lg px-3 py-1 bg-gray-800/50 text-white cursor-pointer outline-none border border-white/20 hover:bg-gray-800/80 transition-colors"
                    value={selectCurrency}
                    onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                    disabled={currencyOption.length === 0}
                >
                    {currencyOption.length > 0 ? (
                        currencyOption.map((currency) => (
                            <option key={currency} value={currency} className="bg-gray-800">
                                {currency}
                            </option>
                        ))
                    ) : (
                        <option className="bg-gray-800">Loading...</option>
                    )}
                </select>
            </div>
        </div>
    );
}

export default InputBox;
