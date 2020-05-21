import React, { useState } from "react";

const useRuler = () => {
  const [componentRefs, setComponentRefs] = useState(new Array());
  const [rules, setRules] = useState([]);

  const addNewComponentRef = (newComponentRef) => setComponentRefs(componentRefs => [...componentRefs, newComponentRef]);
  const addNewRule = (newRule) => setRules(rules => [...rules, newRule]);

  const initializeRuler = (ruler) => {
    for (var rulerEntry of ruler) {
      addNewComponentRef(rulerEntry.ref);

      addNewRule(
        {
          fieldName: rulerEntry.fieldName,
          executeRule(value) {
            let inconsistencies = new Array();
            let rules;
            let key = 0;

            for (var rulerT of ruler) {
              if (rulerT.fieldName === this.fieldName) {
                rules = rulerT.rules;
                break;
              }
            }

            for (var rule of rules) {
              switch (rule.name) {
                case 'range': {
                  // Validating contraints set
                  if (rule.constraints[0] === undefined || rule.constraints[0] === null ||
                    rule.constraints[1] === undefined || rule.constraints[1] === null ||
                    !!rule.constraints[0].toString().match('^(?=.*[A-Za-z])') || !!rule.constraints[1].toString().match('^(?=.*[A-Za-z])')) {

                    throw new Error(`Contraints for ${rule.name} not correctly set!`);
                  }

                  if (value.length < rule.constraints[0] || value.length > rule.constraints[1])
                    inconsistencies.push(`${this.fieldName}|||- Length should range from ${rule.constraints[0]} to ${rule.constraints[1]}|||${key}`);

                  break;
                } case 'contains': {
                  // Validating contraints set
                  if (rule.constraints[0] === undefined || rule.constraints[0] === null ||
                    rule.constraints.length > 1 ||
                    rule.constraints[0] !== 'letter') {

                    throw new Error(`Contraints for ${rule.name} not correctly set!`);
                  }

                  if (rule.constraints[0] === 'letter' && !!!value.match('^(?=.*[A-Za-z])'))
                    inconsistencies.push(`${this.fieldName}|||- Should contain at least one letter|||${key}`);

                  break;
                } default: {
                  throw new Error(`Rule ${rule} not supported`);
                }
              }
            }

            return inconsistencies;
          }
        }
      )
    }
  }

  const validate = (fieldName, fieldValue) => {
    for (var rule of rules) {
      if (rule.fieldName === fieldName) {
        return rule.executeRule(fieldValue);
      }
    }
  };

  const allFieldsValid = () => {
    for (var ref of componentRefs) {
      let fieldData = loadFieldData(ref);
      if(validate(fieldData.fieldName, fieldData.fieldValue).length > 0)
        return false;
    }

    return true;
  };

  const loadFieldData = (ref) => {
    let minifiedInnerHtml = ref.current.innerHTML.replace(/[\n\r]/, "");
    let fieldName = `entered${ref.current.outerText}`;

    // Loading from MaterialUI TextField
    let fieldValue = minifiedInnerHtml.match('value="(.*)">');
    if (!fieldValue) {

      // Loading from MaterialUI TextArea (TextField with multiline setting to true)
      fieldValue = minifiedInnerHtml.match('\">(?!.*">)(.*)</textarea>');
    }

    return { fieldName: fieldName, fieldValue: fieldValue[1] };
  };

  return {
    initializeRuler,
    validate,
    allFieldsValid
  };
};

export default useRuler;