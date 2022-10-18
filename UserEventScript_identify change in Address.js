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
                var currentRecord_old=scriptContext.oldRecord;
                var currentRecord1 = scriptContext.newRecord;




                if (scriptContext.type=='edit') {

                                log.debug("hi");
                                var address_old=currentRecord_old.getValue({
                                        fieldId: 'custrecord_jj_training_address'
                                })
                                var addressfield = currentRecord1.getValue({
                                        fieldId: 'custrecord_jj_training_address'
                                })
                        log.debug(addressfield);
                        if(address_old!=addressfield && addressfield!='')
                        {
                                var customerfield = currentRecord1.getValue({
                                        fieldId: 'custrecord_jj_training_customer'
                                })

                                log.debug(customerfield);
                                var customerfield_name=currentRecord1.getText({
                                        fieldId: 'custrecord_jj_training_customer'
                                })
                                log.debug(customerfield_name);
                                var itemload = record.load({
                                        type: record.Type.CUSTOMER,
                                        id: customerfield,
                                        isDynamic: true
                                });
                                log.debug(itemload);
                                var check=itemload.getValue({
                                        fieldId: 'custentity_jj_training_check'
                                });
                                log.debug(check);
                                var entity=itemload.getValue({
                                        fieldId: 'entityid'
                                });
                                log.debug(entity);
                                if(customerfield_name===entity)
                                {
                                        itemload.setValue({
                                                fieldId:'custentity_jj_training_check',
                                                value:true
                                        })
                                }
                                itemload.save();
                        }



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

                var currentRecord1 = scriptContext.newRecord;
                if(scriptContext.type=='create') {

                    var addressfield = currentRecord1.getValue({
                        fieldId: 'custrecord_jj_training_address'
                    })
                    log.debug(addressfield);

                    if(addressfield!=''){
                        log.debug("create");



                        var customerfield = currentRecord1.getValue({
                            fieldId: 'custrecord_jj_training_customer'
                        })

                        log.debug(customerfield);
                        var itemload = record.load({
                            type: record.Type.CUSTOMER,
                            id: customerfield,
                            isDynamic: true
                        });
                        log.debug(itemload);
                        var check = itemload.getValue({
                            fieldId: 'custentity_jj_training_check'
                        });
                        log.debug(check);
                        var entity = itemload.getValue({
                            fieldId: 'id'
                        });
                        log.debug(entity);
                        if (customerfield === entity) {
                            itemload.setValue({
                                fieldId: 'custentity_jj_training_check',
                                value: true
                            })
                        }
                        itemload.save();

                    }else if(addressfield==''){

                            log.debug("else part");
                            return true;
                    }

                }




        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
