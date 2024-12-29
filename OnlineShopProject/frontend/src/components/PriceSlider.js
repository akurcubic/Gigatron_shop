import React, { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';

const PriceSlider = ({products, values, setValues}) => {

    //const [values, setValues] = useState([minPrice, maxPrice]);

    const STEP = 1;
    const MIN = 0;
    const MAX = 500000;

    const handleChange = (newValues) => {
        setValues(newValues);
        //handlePriceChange(newValues);
    };

    /*const handlePriceChange = (prices) => {
        console.log("Izabrani opseg cena:", prices);
    };*/

    return (
        <div>
            <h5 style={{marginBottom: 40}}>Cena</h5>
            <Range
                values={values}
                step={STEP}
                min={MIN}
                max={MAX}
                onChange={handleChange}
                renderTrack={({ props, children }) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            height: '6px',
                            width: '100%',
                            background: getTrackBackground({
                                values,
                                colors: ['#ccc', '#548BF4', '#ccc'],
                                min: MIN,
                                max: MAX
                            }),
                            borderRadius: '3px'
                        }}
                    >
                        {children}
                    </div>
                )}
                renderThumb={({ props, index }) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            height: '20px',
                            width: '20px',
                            backgroundColor: '#FFF',
                            border: '1px solid #548BF4',
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow: '0px 2px 6px #AAA'
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                top: '-28px',
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: '12px',
                                backgroundColor: '#548BF4',
                                padding: '4px',
                                borderRadius: '4px'
                            }}
                        >
                            {values[index]}RSD
                        </div>
                    </div>
                )}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Min: {values[0]}RSD</span>
                <span>Max: {values[1]}RSD</span>
            </div>
        </div>
    );
};

export default PriceSlider;
