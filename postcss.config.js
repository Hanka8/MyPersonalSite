module.exports = {
    plugins: {
        'postcss-em-media-query': {
            precision: 5,
        },
        'postcss-pxtorem': {
            rootValue: 16, // The root font size (16px is common)
            unitPrecision: 5, // The number of decimal places to round the REM values
            propList: ['*'], // The properties that should be converted to REM units
            selectorBlackList: [], // Selectors to exclude from conversion
            replace: true, // Replace pixel values with REM values
            mediaQuery: true, // Allow REM conversion in media queries
            minPixelValue: 0, // Set the minimum pixel value to replace
        }
    }
};

// use postcss style.css -o processed-style.css to process css