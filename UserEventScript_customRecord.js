/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/email', 'N/record', 'N/runtime','N/search'],
    
    (email,record,runtime,search) => {
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
                try {

                    log.debug('TRIGGERED-Before Submit', scriptContext.type); // Check if type is EDIT and request is NULL = Record was attached or detached
                    if( scriptContext.type == 'create' ) {      // Logic goes here when record was attached or detached...
                        log.debug('name', 'details');
                        var currentRecord1 = scriptContext.newRecord;

                            var customername=currentRecord1.getValue({
                                fieldId:'custrecord_jj_training_cust_name'
                            });
                            //log.debug(customername);
                            var customeremail=currentRecord1.getValue({
                                fieldId:'custrecord_jj_training_cust_email'

                            });
                            //log.debug(customeremail);


                            var search_salesorder=search.create({
                                type:search.Type.CUSTOMER,
                                id:'search_order',
                                title:'custom record',

                                columns:['companyname','email','salesrep','custentity_jj_training_sales_email'],


                            });



                            log.debug("hi");

                        search_salesorder.run().each(function(result) {

                            var companyname = result.getValue('companyname');
                            log.debug(companyname);
                            var emailvalue = result.getValue('email')
                            log.debug(emailvalue);
                            log.debug("1");

                            if (emailvalue == customeremail) {

                                currentRecord1.setValue({
                                    fieldId: 'custrecord_jj_training_c',
                                    value: "there is already exist a a customer "+companyname+ " with this email id ",
                                    ignoreFieldChange: true})



                            }

                            var salesrepvalue=result.getValue('salesrep')
                            log.debug(salesrepvalue);

                            var emailvalue_rep = result.getValue('custentity_jj_training_sales_email')
                            log.debug(emailvalue_rep);


                        })




                        email.send({
                            author: -5,
                            recipients: emailvalue_rep,
                            subject: 'Test',
                            body: "new entry with name "
                        });

                        log.debug("end");


                    }






                } catch (err) {
                        log.error('error@aftersubmit', err);
                }

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

        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
