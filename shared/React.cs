using System.Linq;
using System.Text.RegularExpressions;
using System.Web.Helpers;
using ToSic.Razor.Blade;

public class React: Custom.Hybrid.CodeTyped {
  // -------------------------------------------------------------------------------------
  // These helpers are used by the CSHTML code which loads the react (vite) app.
  // They do a bunch of things, like switching between testing/live code and more.
  // -------------------------------------------------------------------------------------

  // ----------------------------------  Private Constants ----------------------------------
  private const string DefaultAppName = "app"; // Vite app name if not set
  private const string DefaultAppTag = "root"; // React default root tag
  private const string LocalDevServer = "//localhost:5173";

  // ------------------------------ Get from Generated HTML ------------------------------
  // Load the React generated html file and keep only the important parts
  public string ImportReactHtml(string edition, string appName = DefaultAppName, string appTag = DefaultAppTag) {
    // 1. Build the path to where the react app is stored
    var resourcesPath = App.Folder.Url + "/" + edition + "/dist/" + appName;
    var indexFile = App.Folder.PhysicalPath + @"\" + edition + @"\dist\" + appName + @"\index.html";
    string html_orig;

    // 2. Read body contents from index.html
    try {
      html_orig = System.IO.File.ReadAllText(indexFile);
    } catch {
      return "Error trying to access '" + indexFile + "' - it probably doesn't exist";
    }

    // 3.1. Get only the body contents
    var html = Regex.Match(html_orig, "<body.*?>(.*?)</body>", RegexOptions.Singleline).Groups[1].Value;

    // 3.2. Get stylesheets and scripts from <head>
    var headHtml = Regex.Match(html_orig, "<head.*?>(.*?)</head>", RegexOptions.Singleline | RegexOptions.IgnoreCase).Groups[1].Value;
    // Get <link rel="stylesheet"...>
    var stylesheetLink = Regex.Match(headHtml, "<link rel=\"stylesheet\".*?>", RegexOptions.Singleline).Groups[0].Value;
    html += stylesheetLink;
    // Get <script type="module"...>
    var scriptTags = Regex.Matches(headHtml, "<script type=\"module\".*?><\\/script>", RegexOptions.Singleline);
    foreach(Match m in scriptTags) html += m.Groups[0].Value;

    // 4. Change stylesheet and script paths for Vite output (handle ./assets/ and assets/)
    html = Regex.Replace(html, "(src|href)=\"(\\.?\\/)?assets\\/([^\"]+)\"", "$1=\"" + resourcesPath + "/assets/$3\"");

    // 5. Find the app-tag, and add the edition
    html = html.Replace("<" + appTag + ">", "<" + appTag + AppAttributes(edition, resourcesPath + "/") + ">");

    return html;
  }

  // --------------------------------   Get from run start   -------------------------------
  // This returns the tag needed to hot-load the react app 
  public dynamic GetLocalDevTag(string edition = "local", string appTag = DefaultAppTag, string localDevServer = LocalDevServer) {
    // Standard React expects <div id="root"></div>
    // Pass edition/dist-path as data attributes if desired
    return "<div id=\"root\"" + AppAttributes(edition, localDevServer + "/") + "></div>";
  }

  public string GetLocalDevServer() {
    return LocalDevServer;
  }

  // ------------------------------- Private Functions ------------------------------
  private string AppAttributes(string currentEdition, string distPath) {
    return " " + Tag.Attr("edition", currentEdition) 
      + " " + Tag.Attr("api-edition", currentEdition)
      + (Text.Has(distPath) ? " " + Tag.Attr("react-path", distPath) : "");
  }
}