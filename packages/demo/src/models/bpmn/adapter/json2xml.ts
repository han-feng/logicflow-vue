function addIndSpace(ind: string, deep: number) {
  if (deep <= 0) return "";
  for (let i = 0; i < deep; i++) {
    ind += '  ';
  }
  return ind;
}

function toXml(v: any, name: string, ind: string, deep: number) {
  let xml = "";
  if (v instanceof Array) {
    for (let i = 0, n = v.length; i < n; i++) {
      xml += toXml(v[i], name, ind, deep);
    }
  }
  else if (typeof (v) == "object") {
    let hasChild = false;
    xml += addIndSpace(ind, deep) + "<" + name;
    let i = 0;
    for (let m in v) {
      if (m.charAt(0) == "-") {
        i++;
        if (i > 4) {
          xml += "\n  " + addIndSpace(ind, deep);
          i = 1;
        }
        xml += " " + m.substring(1) + "=\"" + v[m].toString() + "\"";
      } else
        hasChild = true;
    }
    xml += hasChild ? ">\n" : " />\n";
    if (hasChild) {
      for (let m in v) {
        if (m == "#text")
          xml += v[m];
        else if (m == "#cdata")
          xml += "<![CDATA[" + v[m] + "]]>\n";
        else if (m.charAt(0) != "-")
          xml += toXml(v[m], m, ind, deep + 1);
      }
      xml += addIndSpace(ind, deep) + "</" + name + ">\n";
    } else {
      // xml += addIndSpace(ind, deep);
    }
  }
  else {
    xml += addIndSpace(ind, deep) + "<" + name + ">" + v.toString() + "</" + name + ">\n";
  }
  return xml;
}

export function lfJson2Xml(o: any) {
  let xmlStr = "";
  for (var m in o) {
    xmlStr += toXml(o[m], m, "", 0);
  }
  return xmlStr;
}
