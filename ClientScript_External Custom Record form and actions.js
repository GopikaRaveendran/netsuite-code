/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */
//Noslen Pena

define(['N/runtime', 'N/currentRecord', 'N/ui/dialog', 'N/search'],
    function (runtime, currentRecord, dialog, search) {
        function pageInit(context){
            try {


            } catch (error) {
                log.error({title: 'Failed initializing', details: error});
            }
        }

        function useNumberFunction(){
            try {
                var skuNumObj = search.lookupFields({
                    type: 'customrecordere_lw_lastskunum',
                    id: 2,
                    columns: ['custrecord_ere_lw_usingsince', 'custrecordere_lw_nextskunum', 'custrecord_ere_lw_whousingskunum']
                });
                var nextSku = skuNumObj.custrecordere_lw_nextskunum[0].value;
                skuNumObj.custrecordere_lw_nextskunum[0].value = Number(nextSku)+1;

                dialog.alert({
                    title: "Information",
                    message: 'Remember to unlock after you have used'
                });
                context.skufield.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.DISABLED
                });
            } catch (error) {
                log.error({title: 'Failed clicking the button', details: error});
            }
        }

        function relaseNumberFunction(){
            dialog.alert({
                title: "Thank you!",
                message: "Remember to update the number and save the changes"
            });
            record.namefield.setValue('Nobody');
            log.debug({title: 'liberaron el uso', details:'Nobody is using the number now'})
        }

        return {
            pageInit : pageInit,
            useNumberFunction    : useNumberFunction,
            relaseNumberFunction : relaseNumberFunction

        };

    });