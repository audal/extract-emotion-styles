<p align="center">
  <a href="http://www.audallabs.com">
    <img alt="Audal Labs Logo" src="https://static.audallabs.com/logodark.png" width="90" />
  </a>
</p>

<h1 align="center">extract-emotion-styles</h1>

<h4 align="center">Extract styles from your emotion-themed components, then get them as CSS Text or re-apply them to a classname of your choosing.</h4>

<pre align="center">npm i extract-emotion-styles</pre>

#### Why build this?
Emotion (and CSS-in-JS libraries generally) make developing great components super fast - but what happens when you need to work with libraries that bake-in classnames or are using dangerouslySetInnerHTML ingested from somewhere else? This library solves all of your styling issues in these scenarios - so you can continue to use Emotion, and style uncontrolled HTML and components just like you would any other Emotion component.

#### What can I do with this?
- Get the styles from an existing Emotion-styled component as CSS text
- Apply styles from an existing Emotion-styled component to any DOM selector of your choosing

#### API
| Function Name               | Description                                                                                                         | Expects                                                                                                                                                                                                                                                                                                                                                               | Returns                           |
|-----------------------------|---------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| parseComponentToStyle       | Take a single Emotion-themed component and return a string of CSS classes.                                          | <b>component</b>: The component you'd like to extract styles from. <br/><br/><b>toClassName (optional)</b>: replace the component's Emotion-generated classname with a classname of your choosing in the extracted rules. <br/><br/><b>shouldUnmount (optional, default: true)</b>: control whether the generated React instance should still be available after styles are extracted. Useful for debugging.  | All found CSS styles as a string. |
| applyComponentStylesToClass | Take a single Emotion-themed component, and apply its styles directly to a different class name.                    | <b>component</b>: The component you'd like to extract styles from. <br/><br/><b>toClassName</b>: replace the component's Emotion-generated classname with a classname of your choosing in the extracted rules. <br/><br/><b>shouldUnmount (optional, default: true)</b>: control whether the generated React instance should still be available after styles are extracted. Useful for debugging. | No return                         |
| addRawCssToGlobalStyles     | Add additional CSS styles globally to your document. Useful for adding additional styles/overriding Emotion styles. | <b>rawCSS:</b> Plain CSS text as a single string                                                                                                                                                                                                                                                                                                                             | No return                         |
