let products;

$.getJSON('products.json', function(data) {
    console.log("Loaded data:", data);
});

function search() {
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