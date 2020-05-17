const useRuler = () => {
  const initializeRuler = (setRulesState, ruler) => {
    for (var rulerEntry of ruler) {

      setRulesState(
        {
          fieldName: rulerEntry.fieldName,
          executeRule(value) {
            let inconsistencies = new Array();
            let rules;

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
                    inconsistencies.push(`${this.fieldName}|||Length should range from ${rule.constraints[0]} to ${rule.constraints[1]}`);

                  break;
                } case 'contains': {
                  // Validating contraints set
                  if (rule.constraints[0] === undefined || rule.constraints[0] === null ||
                    rule.constraints.length > 1 ||
                    rule.constraints[0] !== 'letter') {

                    throw new Error(`Contraints for ${rule.name} not correctly set!`);
                  }

                  if (rule.constraints[0] === 'letter' && !!!value.match('^(?=.*[A-Za-z])'))
                    inconsistencies.push(`${this.fieldName}|||Should contain at least one letter`);

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

  const validate = (rules, fieldName, value) => {
    for (var rule of rules) {
      if (rule.fieldName === fieldName) {
        return rule.executeRule(value);
      }
    }
  };

  return {
    initializeRuler,
    validate
  };
};

export default useRuler;