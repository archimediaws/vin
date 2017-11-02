System.register("Model", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Model;
    return {
        setters: [],
        execute: function () {
            Model = class Model {
                constructor($id) {
                    this.id = $id;
                }
                getId() {
                    return this.id;
                }
                setId(value) {
                    this.id = value;
                }
                get$dom() {
                    return this.$dom;
                }
            };
            exports_1("Model", Model);
        }
    };
});
System.register("Category", ["Model"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Model_1, Category;
    return {
        setters: [
            function (Model_1_1) {
                Model_1 = Model_1_1;
            }
        ],
        execute: function () {
            Category = class Category extends Model_1.Model {
                constructor(id, name) {
                    super(id);
                    this.name = name;
                }
                getName() {
                    return this.name;
                }
                setName(value) {
                    this.name = value;
                }
                display($parent) {
                    let div = "<div class='container " + this.name + "' id='" + this.name + "' data-category=" + this.id + "></div>";
                    this.$dom = $(div);
                    $parent.append(this.$dom);
                }
            };
            exports_2("Category", Category);
        }
    };
});
System.register("BDD", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var BDD;
    return {
        setters: [],
        execute: function () {
            exports_3("BDD", BDD = {
                categories: [
                    {
                        id: 1,
                        name: "rouge"
                    },
                    {
                        id: 2,
                        name: "rose"
                    },
                    {
                        id: 3,
                        name: "blanc"
                    },
                ],
                products: [
                    {
                        id: 1,
                        name: "bordeaux",
                        categoryId: 1
                    },
                    {
                        id: 2,
                        name: "rivesaltes",
                        categoryId: 3
                    },
                    {
                        id: 3,
                        name: "rose",
                        categoryId: 2
                    }
                ],
                vendors: [
                    {
                        id: 1,
                        name: "Paul",
                        products: [1, 2]
                    },
                    {
                        id: 2,
                        name: "jeremy",
                        products: [2]
                    },
                    {
                        id: 3,
                        name: "stephane",
                        products: [1, 3]
                    }
                ]
            });
        }
    };
});
System.register("Product", ["Model"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var Model_2, Product;
    return {
        setters: [
            function (Model_2_1) {
                Model_2 = Model_2_1;
            }
        ],
        execute: function () {
            Product = class Product extends Model_2.Model {
                constructor(id, name, category) {
                    super(id);
                    this.name = name;
                    this.category = category;
                }
                getName() {
                    return this.name;
                }
                setName(value) {
                    this.name = value;
                }
                getCategory() {
                    return this.category;
                }
                display($parent) {
                    let category_name = this.category.getName();
                    let data_id = this.getId();
                    let div = "<div class='item " + category_name + "' id='item" + data_id + "' draggable ='true' data-product=" + this.id + "><span>" + this.name + "</span></div>";
                    this.$dom = $(div);
                    $parent.append(this.$dom);
                }
            };
            exports_4("Product", Product);
        }
    };
});
System.register("Vendor", ["Model"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var Model_3, Vendor;
    return {
        setters: [
            function (Model_3_1) {
                Model_3 = Model_3_1;
            }
        ],
        execute: function () {
            Vendor = class Vendor extends Model_3.Model {
                constructor(id, name, products) {
                    super(id);
                    this.name = name;
                    this.products = products;
                }
                getProducts() {
                    return this.products;
                }
                setProducts(value) {
                    this.products = value;
                }
                getName() {
                    return this.name;
                }
                setName(value) {
                    this.name = value;
                }
                display($parent) {
                    let span = "<span>" + this.name + "</span>";
                    this.$dom = $(span);
                    $parent.append(this.$dom);
                }
                removeProductById(id) {
                    for (let key in this.products) {
                        let product = this.products[key];
                        if (product.getId() == id) {
                            let nkey = parseInt(key);
                            this.products.slice(nkey, 1);
                        }
                    }
                }
                addProduct(product) {
                    this.products.push(product);
                }
                removeProduct(product) {
                    for (let key in this.products) {
                        let vproduct = this.products[key];
                        if (vproduct.getId() == product.getId()) {
                            this.products.splice(parseInt(key), 1);
                        }
                        return;
                    }
                }
            };
            exports_5("Vendor", Vendor);
        }
    };
});
System.register("App", ["Category", "BDD", "Vendor", "Product"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var Category_1, BDD_1, Vendor_1, Product_1, App;
    return {
        setters: [
            function (Category_1_1) {
                Category_1 = Category_1_1;
            },
            function (BDD_1_1) {
                BDD_1 = BDD_1_1;
            },
            function (Vendor_1_1) {
                Vendor_1 = Vendor_1_1;
            },
            function (Product_1_1) {
                Product_1 = Product_1_1;
            }
        ],
        execute: function () {
            App = class App {
                constructor() {
                    this.$item = $(".item");
                    this.$item.prop("draggable", true);
                    this.$container = $(".container");
                    this.vendors = [];
                    this.$vendor = $("#vendeur");
                    this.$form = $("form");
                    this.$vendorname = $("#vendorname");
                    this.$vendeur = $("#vendeur");
                    this.products = [];
                    this.all_products = [];
                    this.$containermain = $("#containermain");
                    this.categorys = [];
                    this.$categoriesproduit = $("#categoriesproduit");
                    this.getAllcategories();
                    this.getAllProducts();
                    this.getAllvendors();
                    this.selectVendor();
                    this.displayCategorys();
                    if (this.vendors.length > 0) {
                        this.currentVendor = this.vendors[0];
                        this.displayProductByVendor(this.currentVendor);
                    }
                }
                getCurrentVendor() {
                    return this.currentVendor;
                }
                setCurrentVendor(value) {
                    this.currentVendor = value;
                }
                getAllcategories() {
                    let categories = BDD_1.BDD.categories;
                    for (let category of categories) {
                        let the_category = new Category_1.Category(category.id, category.name);
                        this.categorys.push(the_category);
                    }
                }
                getAllProducts() {
                    let products = BDD_1.BDD.products;
                    for (let product of products) {
                        let the_product = new Product_1.Product(product.id, product.name, this.getCategoryById(product.categoryId));
                        this.all_products.push(the_product);
                    }
                }
                getCategoryById(id) {
                    for (let category of this.categorys) {
                        if (id == category.getId()) {
                            return category;
                        }
                    }
                    return null;
                }
                getAllvendors() {
                    let vendors = BDD_1.BDD.vendors;
                    for (let vendor of vendors) {
                        let vendors_products = [];
                        for (let product_id of vendor.products) {
                            let the_product = this.getProductById(product_id);
                            vendors_products.push(the_product);
                        }
                        let the_vendor = new Vendor_1.Vendor(vendor.id, vendor.name, vendors_products);
                        this.vendors.push(the_vendor);
                    }
                }
                getProductById(id) {
                    for (let product of this.all_products) {
                        if (id == product.getId()) {
                            return product;
                        }
                    }
                    return null;
                }
                selectVendor() {
                    for (let name of this.vendors) {
                        const optionHtml = "<option value='" + name.getId() + "' > " + name.getName() + "</option>";
                        const option = $(optionHtml);
                        this.$vendor.append(option);
                    }
                }
                getVendorById(id) {
                    for (let vendor of this.vendors) {
                        if (id == vendor.getId()) {
                            return vendor;
                        }
                    }
                    return null;
                }
                displayCategorys() {
                    for (let category of this.categorys) {
                        category.display(this.$categoriesproduit);
                    }
                }
                clearBoard() {
                    this.$containermain.html("");
                    for (let category of this.categorys) {
                        category.get$dom().html("");
                    }
                }
                displayProductByVendor(vendor) {
                    this.clearBoard();
                    for (let product of this.all_products) {
                        let flag = false;
                        for (let vproduct of vendor.getProducts()) {
                            if (vproduct.getId() == product.getId()) {
                                flag = true;
                            }
                        }
                        if (flag == true) {
                            product.display(this.$containermain);
                        }
                        else {
                            let category = product.getCategory();
                            product.display(category.get$dom());
                        }
                    }
                }
            };
            exports_6("App", App);
        }
    };
});
System.register("main", ["App"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var App_1, app;
    return {
        setters: [
            function (App_1_1) {
                App_1 = App_1_1;
            }
        ],
        execute: function () {
            app = new App_1.App();
            $(document).on("dragover", ".container", function (event) {
                event.preventDefault();
            });
            $(document).on("dragstart", ".item", function (event) {
                let dragEvent = event.originalEvent;
                dragEvent.dataTransfer.setData("id", $(this).data("product"));
            });
            app.$containermain.on("drop", function (event) {
                const dragEvent = event.originalEvent;
                let id_product = parseInt(dragEvent.dataTransfer.getData("id"));
                console.log(id_product);
                let product = app.getProductById(id_product);
                app.getCurrentVendor().addProduct(product);
                $(this).append(product.get$dom());
            });
            $(document).on("drop", "#categoriesproduit", function (event) {
                const dragEvent = event.originalEvent;
                let id_product = parseInt(dragEvent.dataTransfer.getData("id"));
                let product = app.getProductById(id_product);
                app.getCurrentVendor().removeProduct(product);
                product.getCategory().get$dom()
                    .append(product.get$dom());
            });
            app.$form.submit(function (event) {
                event.preventDefault();
                let selectedvendorId = app.$vendeur.val();
                let vendor = app.getVendorById(selectedvendorId);
                vendor.display(app.$vendorname);
                app.setCurrentVendor(vendor);
                app.displayProductByVendor(app.getCurrentVendor());
            });
        }
    };
});
//# sourceMappingURL=main.js.map