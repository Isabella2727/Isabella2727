$(document).ready(function() {
    let products = [];
    let dataLoaded = false;

    $.getJSON('products.json', function(data) {
        console.log("Loaded data:", data);
        products = data;
        dataLoaded = true;
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error("Error loading products:", textStatus, errorThrown);
    });

    window.search = function() {
        if (!dataLoaded) {
            console.log("Data not yet loaded. Please try again.");
            return;
        }
        
        console.log("Search function called");
        const query = $('#searchInput').val().toLowerCase();
        const results = products.flatMap(product =>
            product.sizes.filter(size =>
                size.suitableFor.toLowerCase().includes(query) ||
                size.dimensions.toLowerCase().includes(query)
            )
        );

        displayResults(results);
    }

    // Rest of your code...
});


function displayResults(results) {
    const resultsDiv = $('#results');
    resultsDiv.empty();

    if (results.length === 0) {
        resultsDiv.append('<p>No results found.</p>');
    } else {
        results.forEach(result => {
            resultsDiv.append(`
                <div>
                    <h2>Brooke Disc Base</h2>
                    <p>Suitable for: ${result.suitableFor}</p>
                    <p>Dimensions: ${result.dimensions}</p>
                    <p>Price: $${result.price}</p>
                    <p>Code: ${result.code}</p>
                </div>
            `);
        });
    }
}