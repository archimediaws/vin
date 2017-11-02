System.register("APIService", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var APIService;
    return {
        setters: [],
        execute: function () {
            APIService = class APIService {
                constructor() {
                    this.url = "http://192.168.110.49/EcoleDuNum/VIN/API/";
                }
                static getService() {
                    if (!APIService.instance)
                        APIService.instance = new APIService();
                    return APIService.instance;
                }
                getAllProducts() {
                    return new Promise((resolve, reject) => {
                        $.ajax({
                            url: this.url + "products",
                            method: "get",
                            dataType: "json",
                            success: (data) => {
                                resolve(data);
                            },
                            error: (error) => {
                                reject(error);
                            }
                        });
                    });
                }
                getProductById(id) {
                    return new Promise((resolve, reject) => {
                        $.ajax({
                            url: this.url + "product/" + id,
                            method: "get",
                            dataType: "json",
                            success: (data) => {
                                resolve(data);
                            },
                            error: (error) => {
                                reject(error);
                            }
                        });
                    });
                }
                getProductByCatId(id) {
                    return new Promise((resolve, reject) => {
                        $.ajax({
                            url: this.url + "products/cat/@id" + id,
                            method: "get",
                            dataType: "json",
                            success: (data) => {
                                resolve(data);
                            },
                            error: (error) => {
                                reject(error);
                            }
                        });
                    });
                }
                getAllcategories() {
                    return new Promise((resolve, reject) => {
                        $.ajax({
                            url: this.url + "categories",
                            method: "get",
                            dataType: "json",
                            success: (data) => {
                                resolve(data);
                            },
                            error: (error) => {
                                reject(error);
                            }
                        });
                    });
                }
                getCategoryById(id) {
                    return new Promise((resolve, reject) => {
                        $.ajax({
                            url: this.url + "categorie/" + id,
                            method: "get",
                            dataType: "json",
                            success: (data) => {
                                resolve(data);
                            },
                            error: (error) => {
                                reject(error);
                            }
                        });
                    });
                }
                VendorLogin($vendeurname, $uPassword) {
                    return new Promise((resolve, reject) => {
                        $.ajax({
                            url: this.url + "vendor/login",
                            method: "post",
                            dataType: "json",
                            data: {
                                vendorname: $vendeurname,
                                uPassword: $uPassword
                            },
                            success: (data) => {
                                if (data.success == true)
                                    resolve(data.vendor);
                                else
                                    reject(data.error);
                            },
                            error: (error) => {
                                reject(error);
                            }
                        });
                    });
                }
            };
            APIService.instance = null;
            exports_1("APIService", APIService);
        }
    };
});
System.register("Model", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
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
            exports_2("Model", Model);
        }
    };
});
System.register("Category", ["Model"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
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
                    let div = "<div class='container " + this.name + "' id='" + this.name + "' data-category=" + this.id + "><h3>" + this.name + "</h3></div>";
                    this.$dom = $(div);
                    $parent.append(this.$dom);
                }
            };
            exports_3("Category", Category);
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
                    let category_name = this.getName();
                    let data_id = this.getId();
                    let div = "<div class='item " + category_name + "' id='item" + data_id + "' data-product=" + this.id + "><span>" + this.name + "</span></div>";
                    this.$dom = $(div);
                    $parent.append(this.$dom);
                }
                displaydetails($parent) {
                    let category_name = this.getName();
                    let data_id = this.getId();
                    let div = "<div class='detail " + category_name + "' ><h3>détail:<br><span>" + this.name + "</span></h3></div>";
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
                constructor(id, name) {
                    super(id);
                    this.name = name;
                    this.products = [];
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
System.register("App", ["APIService", "Category", "Vendor", "Product"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var APIService_1, Category_1, Vendor_1, Product_1, App;
    return {
        setters: [
            function (APIService_1_1) {
                APIService_1 = APIService_1_1;
            },
            function (Category_1_1) {
                Category_1 = Category_1_1;
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
                    this.$container = $(".container");
                    this.vendors = [];
                    this.$vendor = $("#vendeur");
                    this.$form = $("form");
                    this.$vendorname = $("#vendorname");
                    this.$vendeurname = $("#vendeurname");
                    this.$uPassword = $("#password");
                    this.$vendeur = $("#vendeur");
                    this.products = [];
                    this.all_products = [];
                    this.$containermain = $("#containermain");
                    this.$containermaincat = $("#containermaincat");
                    this.$detail = $("#detail");
                    this.categorys = [];
                    this.$categoriesproduit = $("#categoriesproduit");
                    this.getAllcategories();
                    this.getAllProducts();
                }
                getProducts() {
                    return this.products;
                }
                getCategorys() {
                    return this.categorys;
                }
                getCurrentVendor() {
                    return this.currentVendor;
                }
                setCurrentVendor(value) {
                    this.currentVendor = value;
                }
                getAllProducts() {
                    var api = APIService_1.APIService.getService();
                    let products = api.getAllProducts();
                    products
                        .then((products) => {
                        for (let product of products) {
                            let the_product = new Product_1.Product(product.id, product.productname, product.categoryId);
                            this.all_products.push(the_product);
                        }
                    })
                        .catch((error) => {
                        console.log(error);
                    });
                }
                getProductById(id) {
                    var api = APIService_1.APIService.getService();
                    let productId = api.getProductById(id);
                    productId
                        .then((productId) => {
                        for (let product of this.products) {
                            if (id == product.getId()) {
                                product.displaydetails(this.$detail);
                            }
                        }
                    })
                        .catch((error) => {
                        console.log(error);
                    });
                }
                getAllcategories() {
                    var api = APIService_1.APIService.getService();
                    let categories = api.getAllcategories();
                    categories
                        .then((categories) => {
                        for (let category of categories) {
                            let the_category = new Category_1.Category(category.id, category.categoryname);
                            this.categorys.push(the_category);
                        }
                    })
                        .catch((error) => {
                        console.log(error);
                    });
                }
                getCategoryById(id) {
                    var api = APIService_1.APIService.getService();
                    let categoryId = api.getCategoryById(id);
                    categoryId
                        .then((categoryId) => {
                        for (let category of this.categorys) {
                            if (id == category.getId()) {
                                console.log(category);
                                this.displayProductByCategory(category);
                            }
                        }
                    })
                        .catch((error) => {
                        console.log(error);
                    });
                }
                VendorLogin($vendeurname, $uPassword) {
                    var api = APIService_1.APIService.getService();
                    let vendeur = api.VendorLogin($vendeurname, $uPassword);
                    vendeur
                        .then((vendeur) => {
                        let the_vendor = new Vendor_1.Vendor(vendeur.id, vendeur.vendorname);
                        for (let vproduct of vendeur.products) {
                            let the_product = new Product_1.Product(vproduct.id, vproduct.productname, vproduct.categoryId);
                            the_vendor.addProduct(the_product);
                            this.products.push(the_product);
                        }
                        this.setCurrentVendor(the_vendor);
                        the_vendor.display(this.$vendorname);
                        this.displayProductByVendor();
                        this.displayCategorys();
                    })
                        .catch((error) => {
                        console.log(error);
                    });
                }
                displayCategorys() {
                    for (let category of this.categorys) {
                        category.display(this.$categoriesproduit);
                    }
                }
                displayProductByCategory(category) {
                    console.log(this.products);
                    for (let vproduct of this.products) {
                        if (vproduct.getCategory() == category.getId()) {
                            vproduct.display(this.$containermaincat);
                        }
                    }
                    this.$containermain.hide();
                }
                displayProductByVendor() {
                    for (let product of this.products) {
                        product.display(this.$containermain);
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
            app.$form.submit(function (event) {
                event.preventDefault();
                let selectedvendorName = app.$vendeurname.val();
                let selectedvendorPassword = app.$uPassword.val();
                let vendor = app.VendorLogin(selectedvendorName, selectedvendorPassword);
            });
            $(document).on("click", ".container", function (event) {
                event.stopPropagation();
                let id = $(this).data("category");
                console.log(id);
                app.$containermain.hide();
                app.$containermaincat.show();
                app.getCategoryById(id);
            });
            $(document).on("click", ".item", function (event) {
                event.stopPropagation();
                let id = $(this).data("product");
                console.log(id);
                app.getProductById(id);
            });
        }
    };
});
//# sourceMappingURL=main.js.map