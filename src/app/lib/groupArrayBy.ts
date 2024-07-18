// This creates a 2 dimensional grouped array sorted by grouping
// Level 1: grouping value
// Level 2: all array items that have the matching grouping value

const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function groupArrayBy(arr: any[] = [], groupBy: any, subProperty?: string) {

  const grouping = arr.reduce((groupingObject: any, currentVal: any) => {
    let current = currentVal;
    if (subProperty) {
      current = currentVal[subProperty];
    }

    // Get value of current object property to group on
    let currentGroup = current[groupBy];
    
    if (!currentGroup) {
      groupingObject['uncategorized'] = [
        ...(groupingObject['uncategorized'] || []),
        currentVal,
      ];
      return groupingObject;
    };

    if (typeof currentGroup !== 'string') {
      currentGroup = currentGroup['name'];
    }

    const currentGroupLowercase = capitalize((currentGroup as string).toLowerCase());
    // If the groupingArray already has a grouping for this, add current value to it, if not then create a new one
    groupingObject[currentGroupLowercase] = [
      ...(groupingObject[currentGroupLowercase] || []),
      currentVal,
    ];
    return groupingObject;
  }, {});

  return Object.entries(grouping).sort((a, b) => (a[0] < b[0] ? -1 : 1));
}