/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record'],

    (record) => {


        /**
         * Defines the function definition that is executed before record is loaded.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @param {Form} scriptContext.form - Current form
         * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
         * @since 2015.2
         */
        const beforeLoad = (scriptContext) => {

        }

        /**
         * Defines the function definition that is executed before record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const beforeSubmit = (scriptContext) => {

        }

        /**
         * Defines the function definition that is executed after record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const afterSubmit = (scriptContext) => {

                log.debug("Hello World");
                try {
                        var currentRecord1 = scriptContext.newRecord;
                        if (scriptContext.type == 'edit'&& currentRecord1.type == record.Type.CUSTOMER) {

                                        var customer_id = currentRecord1.getText({
                                                fieldId: 'id'
                                        });

                                        var customer_email = currentRecord1.getValue({
                                                fieldId: 'email'
                                        });
                                        var customer_sales_rep = currentRecord1.getText({
                                                fieldId: 'salesrep'

                                        });
                                        var customer_coupon = currentRecord1.getValue({
                                                fieldId: 'custentity_jj_coupon_code'
                                        });



                        }
                    log.debug(`customer id is ${customer_id} and customer email is ${customer_email} and sales rep is ${customer_sales_rep} and ${customer_coupon}`);




                }catch(err)
                {
                        log.debug('error@aftersubmit', err);
                }

        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
