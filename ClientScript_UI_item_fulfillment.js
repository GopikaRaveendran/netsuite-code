/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/search','N/record'],

    function(search,record) {



        /**
         * Validation function to be executed when record is saved.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @returns {boolean} Return true if record is valid
         *
         * @since 2015.2
         *
         */
        function saveRecord(scriptContext) {
            var record = scriptContext.currentRecord;
            var testing = record.getValue({
                fieldId: 'createdfrom'
            })
            var testcustomer=record.getText({
                fieldId:'entity'
            })
            log.debug(testing);
            log.debug(testcustomer);
            var sales_order_details = search.lookupFields({
                type: search.Type.SALES_ORDER,
                id: testing,
                columns: ['total']
            });
            // log.debug({
            //     title:'Total from sales order',
            //     details:sales_order_details['total']
            // });
            var totaltotal=sales_order_details['total'];
console.log(totaltotal)

            var customer_depo_details = search.create({
                type: search.Type.CUSTOMER_DEPOSIT,

                columns: ['amount'],
                title:'customer deposite',
                id:'cust_depo',
                filters:[{name:'name',operator:'is',values:testcustomer}],

            })

            customer_depo_details.run().each(function(result) {

                var amountvalue=result.getValue('amount');

                // log.debug({
                //     title:'Payment from Customer Deposite',
                //     details:amountvalue
                // });
console.log(amountvalue);

                if(totaltotal<=amountvalue)
                {
                    return true;

                }
                {
                    alert("mutiple customer deposite not allow");
                    return false;
                }

            });

        }

        return {

            saveRecord: saveRecord
        };

    });
