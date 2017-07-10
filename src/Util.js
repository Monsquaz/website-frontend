export default {
  mapTree: (items, itemTree) => {
    let tree = itemTree.slice(0);
    let itemsById = {};
    for(var i = 0; i < items.length; i++) {
      itemsById[items[i].id] = items[i];
    }
    do {
      for(i_descendant in tree) {
        var isAncestor = false;
        for(i_ancestor in tree) {
          if(tree[i_descendant].descendant == tree[i_ancestor].ancestor) {
            isAncestor = true;
          }
        }
        if(!isAncestor) {
          if(   tree[i_descendant].ancestor in itemsById
            &&  tree[i_descendant].descendant in itemsById
          ) {
            if(!itemsById[tree[i_descendant].ancestor].children) {
              itemsById[tree[i_descendant].ancestor].children =
                [itemsById[tree[i_descendant].descendant]];
            } else {
              itemsById[tree[i_descendant].ancestor].children.push(
                itemsById[tree[i_descendant].descendant]
              );
            }
          }
          delete itemsById[tree[i_descendant].descendant];
          if(tree.length == 1) {
            return Object.values(itemsById);
          }
          tree.splice(i_descendant, 1);

        }
      }
    } while(tree.length > 0);
    return Object.values(itemsById);
  },
  mapTranslations: (data) => {
    let result = {};
    for(translation of data) {
      result[translation.lang] = translation.content;
    }
    return result;
  };
}
