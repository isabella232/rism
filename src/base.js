import variables from "./variables";
import normalize from "react-style-normalizer";

export default {
    a:{
        color:"blue",
        cursor:"pointer",
        textDecoration:"underline"
    },
    hr:{
        borderColor:"#eee",
        borderStyle:"solid none",
        borderWidth:"1px 0",
        marginBottom:10,
        marginTop:10
    },
    p:{
        margin:"1em 0"
    },
    wrapAll:{
        backgroundColor:variables.backgroundColor.toString(),
        color:variables.fontColor.toString(),
        fontFamily:"TypoPRO Roboto, Helvetica Neue, Helvetica, Arial, sans-serif",
        fontSize:variables.fontSize,
        fontWeight:variables.fontWeight,
        height:"auto",
        minHeight:"100vh"
    }
};