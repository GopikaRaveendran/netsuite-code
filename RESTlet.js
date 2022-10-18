/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */
define(['N/record','N/search'],
    (record ,search) => {
        /**
         * Defines the function that is executed when a GET request is sent to a RESTlet.
         * @param {Object} requestParams - Parameters from HTTP request URL; parameters passed as an Object (for all supported
         *     content types)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */

      const get = (requestParams) => {
             var sales_order_details=search.lookupFields({
               type:search.Type.SALES_ORDER,
              id: requestParams.internalId,
                columns:['entity','tranid','trandate','memo','item']
           });



            var rec = record.load({
                type:record.Type.SALES_ORDER,
                id: requestParams.internalId
            });
          var numlines=rec.getLineCount({
              sublistId:'item'
          });
          var item_name=new Array(numlines);
          for(var i=0;i<numlines;i++)
          {

               item_name[i]=rec.getSublistText({sublistId:'item',
                                    fieldId:'item',

                                    line:i})+ " "+rec.getSublistValue({sublistId:'item',
                  fieldId:'quantity',
                  line:i});



          }
            return{ "customer name":sales_order_details.entity,"doc no":sales_order_details.tranid,"date":sales_order_details.trandate,"memo":sales_order_details.memo,"item_name":item_name}
            /** return JSON.stringify(record.load({
                type:record.Type.SALES_ORDER,
                id: requestParams.internalId,


            })); */


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
                type:record.Type.SALES_ORDER,
                id: requestBody.internalId
            });
           rec.setValue({
               fieldId:'memo',
               value:'hello'
           });
           rec.save();

           /** rec.setValue('orderstatus','R')

            rec.save();
            return JSON.stringify(rec); * **/

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
      const post = (requestBody) => { /**

            /** function salesOrderCreation(){
                 log.debug("created"); **/

                var resultCustomer=record.create({
                    type:'salesorder',
                    isDynamic:true

                });



                resultCustomer.setValue({
                    fieldId: 'entity',
                    value: requestBody.entity
                });

                /**resultCustomer.selectNewLine({
                    sublistId: 'item'
                });



                resultCustomer.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'item',
                    value:requestBody.item[0].item
                });
                resultCustomer.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity ',
                    value: requestBody.item[0].quantity
                }); **/

                 resultCustomer.selectNewLine({ sublistId: 'item' });

                 resultCustomer.setCurrentSublistValue({ sublistId: 'item', fieldId: 'item', value: requestBody.item[0].item });//Repair Cost
                 resultCustomer.setCurrentSublistValue({ sublistId: 'item', fieldId: 'quantity', value: requestBody.item[0].quantity });//Repa





                resultCustomer.commitLine({
                    sublistId: 'item'
                });



                var recordId=resultCustomer.save();
return(recordId);
           // }
            log.debug("created");
            //salesOrderCreation(); **/
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
                type:record.Type.SALES_ORDER,
                id: requestParams.internalId
            });
            log.debug("deleted");


        }


        return {get, put, post, delete: doDelete}

    });