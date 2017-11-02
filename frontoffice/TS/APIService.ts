export class APIService {

    private static instance: APIService = null;
    private url:string = "http://192.168.110.49/EcoleDuNum/VIN/API/";

    static getService(): APIService {

        if( !APIService.instance )
            APIService.instance = new APIService();

        return APIService.instance;
    }

    private constructor(){}

    getAllProducts(): Promise<{}> {
        
        return new Promise((resolve, reject) => {
            $.ajax({
                url: this.url + "products",
                method: "get",
                dataType:"json",
                success: ( data: {} ) => {
                    resolve( data );
                },
                error: ( error:any ) => {
                    reject( error );
                }
            });
        })

    }
    
    getProductById(id:number): Promise<{}> {
        
        return new Promise((resolve, reject) => {
            $.ajax({
                url: this.url + "product/"+id,
                method: "get",
                dataType:"json",
                success: ( data: {} ) => {
                    resolve( data );
                },
                error: ( error:any ) => {
                    reject( error );
                }
            });
        })

    }

    getProductByCatId(id:number): Promise<{}> {
        
        return new Promise((resolve, reject) => {
            $.ajax({
                url: this.url + "products/cat/@id"+id,
                method: "get",
                dataType:"json",
                success: ( data: {} ) => {
                    resolve( data );
                },
                error: ( error:any ) => {
                    reject( error );
                }
            });
        })

    }

    getAllcategories(): Promise<{}> {
        
        return new Promise((resolve, reject) => {
            $.ajax({
                url: this.url + "categories",
                method: "get",
                dataType:"json",
                success: ( data: {} ) => {
                    resolve( data );
                },
                error: ( error:any ) => {
                    reject( error );
                }
            });
        })

    }

    getCategoryById(id:number): Promise<{}> {
        
        return new Promise((resolve, reject) => {
            $.ajax({
                url: this.url + "categorie/"+id,
                method: "get",
                dataType:"json",
                success: ( data: {} ) => {
                    resolve( data );
                },
                error: ( error:any ) => {
                    reject( error );
                }
            });
        })

    }


        VendorLogin($vendeurname:string, $uPassword:string): Promise<{}>{
            
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: this.url + "vendor/login",
                    method: "post",
                    dataType:"json",
                    data: {
                        vendorname: $vendeurname,
                        uPassword: $uPassword
                    },
                    success: ( data: any ) => {
                        if( data.success == true)
                            resolve( data.vendor );
                        else
                            reject(data.error);
                    },
                    error: ( error:any ) => {
                        reject( error );
                    }
                });
            })
            
    }   


    // getVendorById(id:number): Promise<{}> {
        
    //     return new Promise((resolve, reject) => {
    //         $.ajax({
    //             url: this.url + "vendor/"+id,
    //             method: "get",
    //             dataType:"json",
    //             success: ( data: {} ) => {
    //                 resolve( data );
    //             },
    //             error: ( error:any ) => {
    //                 reject( error );
    //             }
    //         });
    //     })

    // }


}