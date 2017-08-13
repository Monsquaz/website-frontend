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
          if(tree[i_descendant].descendant.id == tree[i_ancestor].ancestor.id) {
            isAncestor = true;
          }
        }
        if(!isAncestor) {
          if(   tree[i_descendant].ancestor.id in itemsById
            &&  tree[i_descendant].descendant.id in itemsById
          ) {
            if(!itemsById[tree[i_descendant].ancestor.id].children) {
              itemsById[tree[i_descendant].ancestor.id].children =
                [itemsById[tree[i_descendant].descendant.id]];
            } else {
              itemsById[tree[i_descendant].ancestor.id].children.push(
                itemsById[tree[i_descendant].descendant.id]
              );
            }
          }
          delete itemsById[tree[i_descendant].descendant.id];
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
