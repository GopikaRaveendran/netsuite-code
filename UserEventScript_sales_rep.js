/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record','N/email','N/runtime'],
    
    (record,email,runtime) => {


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


                        if (scriptContext.type == 'create')
                        {
                                var type1 = currentRecord1.getValue({
                                        fieldId: 'id'
                                });
                                var salesrep1 = currentRecord1.getValue({
                                        fieldId: 'salesrep'
                                });

                                var resultCustomer1 = record.create({
                                        type:record.Type.TASK,
                                        isDynamic: true,
                                        defaultValues:{
                                                'customform':-120
                                        }

                                });
                                log.debug(resultCustomer1);

                                        resultCustomer1.setValue({
                                                fieldId:'assigned',
                                                value:salesrep1
                                        });
                                        resultCustomer1.setValue({
                                                fieldId:'company',
                                                value:type1
                                        });
                                        resultCustomer1.setValue({
                                                fieldId:'title',
                                                value:'New customer Follow-up'
                                        });
                                        resultCustomer1.setValue({
                                                fieldId:'message',
                                                value:'please take care of this customer and follow-up with them soon'
                                        });
                                        resultCustomer1.setValue({
                                                fieldId:'priority',
                                                value:'HIGH'
                                        });

                                var save_record=resultCustomer1.save();
                                log.debug(save_record);

                            }

        }





        return { afterSubmit}

    });
