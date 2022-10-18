/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/record','N/search'],

function(record,search) {
    

    /**
     * Function to be executed when field is changed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
     * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
     *
     * @since 2015.2
     */
    function fieldChanged(scriptContext) {
        var record1 = scriptContext.currentRecord;

            if(scriptContext.fieldId=='custrecord_jj_training_address'){

                var addressfield = record1.getText({
                    fieldId: 'custrecord_jj_training_address'
                })
                console.log(addressfield);
                var customerfield = record1.getValue({
                    fieldId: 'custrecord_jj_training_customer'
                })

                console.log(customerfield);
                var customerfield_name=record1.getText({
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


    return {
        fieldChanged: fieldChanged,

    };
    
});
