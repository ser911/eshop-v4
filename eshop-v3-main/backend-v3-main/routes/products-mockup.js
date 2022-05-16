// GET ALL PRODUCTS IN THE DATABASE - NO FILTERS

router.get(`/`, async (req, res) => {
    // localhost:3000/api/v1/products?categories=2342342,234234
    let filter = {};
    if (req.query.categories) {
        filter = {
            category: req.query.categories.split(',')
        }
    }

    const productList = await Product.find(filter).populate('brand');


    if (!productList) {
        res.status(500).json({
            success: false
        })
    }
    res.send(productList);
})

// GET ALL PRODUCTS - OPTIONAL BRAND FILTER ONLY
router.get(`/get/brand/all`, async (req, res) => {

    if (req.query.brand) {
        brand = {
            brand: req.query.brand
        };
    }

    const productsList = await Product.find(brand);
    if (!productsList) {
        res.status(500).json({
            success: false
        })
    }

    res.send(productsList);
})


// GET ALL PRODUCTS FOR MEN - OPTIONAL BRAND FILTER ONLY

router.get(`/get/brand/men`, async (req, res) => {

    if (req.query.brand) {
        brand = {
            brand: req.query.brand
        };
    }

    const productsList = await Product.find(brand);
    if (!productsList) {
        res.status(500).json({
            success: false
        })
    }

    const specificProductList = productList.filter((x) => x.sex === 'M');

    res.send(specificProductList);
})



// GET ALL PRODUCTS FOR WOMEN - OPTIONAL BRAND FILTER ONLY

router.get(`/get/brand/women`, async (req, res) => {

    if (req.query.brand) {
        brand = {
            brand: req.query.brand
        };
    }

    const productsList = await Product.find(brand);
    if (!productsList) {
        res.status(500).json({
            success: false
        })
    }

    const specificProductList = productList.filter((x) => x.sex === 'F');

    res.send(specificProductList);
})