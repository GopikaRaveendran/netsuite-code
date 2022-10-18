/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */
define(['N/record','N/search'],
    
    (record,search) => {
        /**
         * Defines the function that is executed when a GET request is sent to a RESTlet.
         * @param {Object} requestParams - Parameters from HTTP request URL; parameters passed as an Object (for all supported
         *     content types)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const get = (requestParams) => {
            // if(requestParams.internalId==null){
            //     var sales_order_details=search.create({
            //         type:search.Type.SALES_ORDER,
            //         id: 'statusopen',
            //         title:'salesorder status open',
            //         columns:['internalid','tranid','trandate','total','status'],
            //         filters:[['status','anyOf','SalesOrd:A'],"or",['status','anyOf','SalesOrd:B'],"or",['status','anyOf','SalesOrd:C'],"or",['status','anyOf','SalesOrd:D'],"or",['status','anyOf','SalesOrd:E'],"or",['status','anyOf','SalesOrd:F'],"or",['status','anyOf','SalesOrd:G']]
            //     }).run().getRange({
            //         start:0,
            //         end:100
            //     });
            //     return sales_order_details;
            // }
            //    else{
            //     var sales_order_details_2nd=search.lookupFields({
            //         type:search.Type.SALES_ORDER,
            //         id: requestParams.internalId,
            //         columns:['internalid','item']
            //     });
            //
            //     var internalid=sales_order_details_2nd['internalid'];
            //
            //     if(internalid==null){
            //         return "RESULT NOT FOUND"
            //     }
            //
            //
            //
            //     var rec = record.load({
            //         type:record.Type.SALES_ORDER,
            //         id: requestParams.internalId
            //     });
            //
            //
            //     var numlines=rec.getLineCount({
            //         sublistId:'item'
            //     });
            //     var item_name=[];//new Array(numlines);
            //     var subtotal=0;
            //     for(var i=0;i<numlines;i++)
            //     {
            //         var itemname=rec.getSublistText({sublistId:'item',  fieldId:'item',line:i});
            //         var rate=rec.getSublistValue({sublistId:'item',fieldId:'rate',line:i})
            //
            //         var quantity=rec.getSublistValue({sublistId:'item',fieldId:'quantity',line:i})
            //         var amount=rec.getSublistValue({sublistId:'item',fieldId:'amount',line:i})
            //
            //         var subtotal1=rec.getSublistValue({sublistId:'item',fieldId:'amount',line:i});
            //         subtotal=subtotal+subtotal1;
            //
            //         item_name.push({'item':itemname});
            //         item_name.push({'rate':rate})
            //         item_name.push({'quantity':quantity})
            //         item_name.push({'amount':amount})
            //
            //
            //         var subtotal1=rec.getSublistValue({sublistId:'item',fieldId:'amount',line:i});
            //         subtotal=subtotal+subtotal1;
            //
            //
            //     }
            //
            //
            //
            //    return{item_name,"internal id":internalid, "gross amount":subtotal}
            //
            //
            //
            //
            //  }
            //



        }

        /**
         * Defines the function that is executed when a PUT request is sent to a RESTlet.
         * @param {string | Object} requestBody - The HTTP request body; request body are passed as a string when request
         *     Content-Type is 'text/plain' or parsed into an Object when request Content-Type is 'application/json' (in which case
         *     the body must be a valid JSON)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const put = (requestBody) => {
                var rec = record.load({
                        type:record.Type.ITEM_FULFILLMENT,
                        id: requestBody.internalId
                });
                rec.setValue({
                        fieldId:'memo',
                        value:requestBody.memo
                });

                rec.setValue({fieldId:'entity',value:requestBody.entity});
                rec.save();
        }

        /**
         * Defines the function that is executed when a POST request is sent to a RESTlet.
         * @param {string | Object} requestBody - The HTTP request body; request body is passed as a string when request
         *     Content-Type is 'text/plain' or parsed into an Object when request Content-Type is 'application/json' (in which case
         *     the body must be a valid JSON)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const post = (requestBody) => {
            if (requestBody) {

                log.debug(requestBody.salesOrderid);


                var fulfillment = record.transform({
                    fromType: record.Type.SALES_ORDER,
                    fromId: requestBody.salesOrderid,
                    toType: record.Type.ITEM_FULFILLMENT,
                    isDynamic: true
                });
             //   fulfillment.setValue({fieldId: 'shipstatus', value:requestBody.shipstatus});


                var recordId = fulfillment.save();
                return (recordId);


            }
        }

        /**
         * Defines the function that is executed when a DELETE request is sent to a RESTlet.
         * @param {Object} requestParams - Parameters from HTTP request URL; parameters are passed as an Object (for all supported
         *     content types)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const doDelete = (requestParams) => {
            record.delete({
                type:record.Type.ITEM_FULFILLMENT,
                id: requestParams.internalId
            });
            log.debug("deleted");
        }

        return {get, put, post, delete: doDelete}

    });
