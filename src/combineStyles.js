// since I use it in the element
export default function() {
    var obj = {};

    utils.forEach(arguments,function(argument,i) {
        obj = utils.merge(obj, prefix(argument));
    });

    return obj;
}