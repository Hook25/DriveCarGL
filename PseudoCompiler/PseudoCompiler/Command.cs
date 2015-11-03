using System;
using System.Collections.Generic;
using System.IO;
using System.Xml.Serialization;

namespace PseudoCode {
    public class Command:IEquatable<string> {
        public string PseudoCommand { get; set; }
        public string TrasformationRule { get; set; } 
        ///the name of the action to be executed, reflecting action can
        ///be an security issue, to be changed ?  TODO
        public string EffectiveCommand { get; set; }
        private object[] _trasformationSupplements { get; set; }
        public Command(string _pseudoCommand, string _effCommand, string _a = "", object[] _args = null) {
            this.PseudoCommand = _pseudoCommand; this.EffectiveCommand = _effCommand; 
            this.TrasformationRule = _a; this._trasformationSupplements = _args;
        }
        public Command() { }
        public bool Equals(string s) {
            return PseudoCommand.Equals(s);
        }
    }
    public class Factory {
        List<Command> lsc { get; set; }
        public Factory() {
            lsc = new List<Command>();
        }
        public void SaveFactory() {
            var serializer = new XmlSerializer(typeof(List<Command>));
            serializer.Serialize(new StreamWriter("C:\\Lavoro-temp\\saves.xml"), lsc);
        }
        public void AddCommand(Command c) {
            lsc.Add(c);
        }
        public void GetCommand(string c) {
            return lsc.Find((st)=>{
                return st.PseudoCommand == c;
            }
                )
        }
    }
}