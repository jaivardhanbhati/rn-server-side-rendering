import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

// Event handler map
const eventHandlers = {
  handleClick: () => alert("Button clicked! Event resolved on client."),
};

// Renderer
function renderComponent(schema) {
  if (!schema) return null;

  const { type, props, children } = schema;

  switch (type) {
    case "View":
      return (
        <View {...props}>
          {children && children.map((child, i) => (
            <React.Fragment key={i}>{renderComponent(child)}</React.Fragment>
          ))}
        </View>
      );
    case "Text":
      return <Text {...props}>{props.children}</Text>;
    case "Button":
      return (
        <Button
          {...props}
          onPress={eventHandlers[props.onPress] || (() => {})}
        />
      );
      case "Card":
      return (
        <View
        style={{
          backgroundColor: "white",
          padding: 16,
          borderRadius: 12,
          margin: 8,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }}
        >
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
        Me@Campus Title
      </Text>
      <Text>"Details of the Card"</Text>
    </View>
      );
    default:
      return null;
  }
}

export default function HomeScreen3() {

  const [uiSchema, setUiSchema] = useState(null);

  useEffect(() => {
    fetch("http://192.168.0.3:3000/data") // ⚠️ replace with your server IP
      .then((res) => res.json())
      .then(setUiSchema)
      .catch(console.error);
  }, []);

  return uiSchema ? renderComponent(uiSchema) : <Text>Loading...</Text>;


  //   const [result, setResult] = useState("Fetching script...");

  //   const runRemoteScript = async () => {
  //   try {
  //     // Example: Replace with your server endpoint
  //     const res = await fetch("http://localhost:8000/script.js");
  //     const jsCode = await res.text();

  //     const vm = QuickJS.newContext();
  //     const evalResult = vm.evalCode(jsCode);

  //     if (evalResult.error) {
  //       setResult("Error: " + evalResult.error.message);
  //     } else {
  //       setResult("Output: " + evalResult.value.toString());
  //       evalResult.value.dispose();
  //     }
  //     vm.dispose();
  //   } catch (e) {
  //     setResult("Fetch/Execution failed: " + e.message);
  //   }
  // };

  // useEffect(() => {
  //   runRemoteScript();
  // }, []);

  // return (
  //   <SafeAreaView style={{ flex: 1, padding: 20 }}>
  //     <Button title="Reload Script" onPress={runRemoteScript} />
  //     <ScrollView>
  //       <Text style={{ marginTop: 20, fontSize: 18 }}>{result}</Text>
  //     </ScrollView>
  //   </SafeAreaView>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
  },
});

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });
