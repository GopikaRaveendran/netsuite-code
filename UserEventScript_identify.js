/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record'],
    
    (record) => {


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
                var currentRecord_new = scriptContext.newRecord;




              if (scriptContext.type=='edit') {

                        log.debug("hi");

                        var numlineold=currentRecord_old.getLineCount({
                                sublistId:'addressbook'
                        });
                        log.debug(numlineold);

                        var numlinesnew=currentRecord_new.getLineCount({
                                sublistId:'addressbook'
                        });
                        log.debug(numlinesnew);

                        if(numlinesnew>numlineold){
                                currentRecord_new.setValue({
                                        fieldId:'custentity_jj_training_check',
                                        value:true
                                })
                        }


                  for (var line = 0; line < numlinesnew; line++) {

                      var oldvalue=currentRecord_old.getSublistValue({sublistId:'addressbook',fieldId:'addressbookaddress_text',line:line})
                      log.debug({
                          title: 'line#' + line,
                          details:oldvalue



                      });

                      log.debug("center");

                   var newvalue =   currentRecord_new.getSublistValue({ sublistId: 'addressbook', fieldId: 'addressbookaddress_text', line: line })
                      log.debug({
                          title: 'line#' + line,
                          details:newvalue



                      });

                      if(oldvalue==newvalue){
                          log.debug("no change");
                      }
                      else{
                          log.debug("change");
                          currentRecord_new.setValue({
        fieldId:'custentity_jj_training_check',
       value:true
 })
                      }
                  }




               }
        }



        return { beforeSubmit}

    });


