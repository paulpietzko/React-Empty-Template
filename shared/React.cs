using System.Linq;
using System.Text.RegularExpressions;
using System.Web.Helpers;
using ToSic.Razor.Blade;

public class React: Custom.Hybrid.CodeTyped {
  // -------------------------------------------------------------------------------------
  // These helpers are used by the CSHTML code which loads the react app.
  // They do a bunch of things, like switching between testing/live code and more.
  // -------------------------------------------------------------------------------------

  // ----------------------------------  Private Constants ----------------------------------
  private const string DefaultAppName = "app";   // React app name if not set
  private const string DefaultAppTag = "app-root";  // React app tag if not set
  private const string LocalDevServer = "//localhost:5173"; // default localhost dev-server using vite

  // ------------------------------ Get from Generated HTML ------------------------------
  // load the React generated html file and keep only the important parts
  public string ImportReactHtml(string edition, string appName = DefaultAppName, string appTag = DefaultAppTag) {
    // 1. build the path to where the react app is stored
    var resourcesPath = App.Folder.Url + "/" + edition + "/dist/" + appName;
    var indexFile = App.Folder.PhysicalPath + @"\" + edition + @"\dist\" + appName + @"\index.html";
    string html_orig;

    // 2. Read body contents from index.html
    try {
      html_orig = System.IO.File.ReadAllText(indexFile);
    } catch {
      return "Error trying to access '" + indexFile + "' - it probably doesn't exist";
    }

    // 3.1. Extract <head> and <body>
    var headMatch = Regex.Match(html_orig, "<head.*?>(.*?)</head>", RegexOptions.Singleline | RegexOptions.IgnoreCase);
    var headHtml = headMatch.Success ? headMatch.Groups[1].Value : "";
    var bodyMatch = Regex.Match(html_orig, "<body.*?>(.*?)</body>", RegexOptions.Singleline | RegexOptions.IgnoreCase);
    var bodyHtml = bodyMatch.Success ? bodyMatch.Groups[1].Value : "";

    // 3.2. Fix asset paths in <head> for Vite output: handle ./assets/ and assets/
    headHtml = Regex.Replace(headHtml,
      @"(href|src)=""(\.?\/)?assets\/([^""]+)""",
      $"$1=\"{resourcesPath}/assets/$3\"",
      RegexOptions.IgnoreCase);

    // 3.3. Replace the appTag for edition and resource path in <body>
    bodyHtml = bodyHtml.Replace("<" + appTag + ">", "<" + appTag + AppAttributes(edition, resourcesPath + "/") + ">");

    // 3.4. Return preserved structure (head + body)
    return "<head>" + headHtml + "</head>\n<body>" + bodyHtml + "</body>";
  }

  // --------------------------------   Get from run start   -------------------------------
  // This returns the tag needed to hot-load the react app 
  public dynamic GetLocalDevTag(string edition = "local", string appTag = DefaultAppTag, string localDevServer = LocalDevServer) {
    return "<" + appTag + AppAttributes(edition, LocalDevServer + "/") + ">"
      + "This loads all scripts from " + localDevServer + " using the same protocol (http/https) as the current site uses. "
      + "If you see this message, your local dev is either not running, or the configuration is wrong. <br>"
      + "It should be running on localhost:4200 and use the same protocol as this website. <br><br>"
      + "To make sure you're doing things right, please follow <a href='https://azing.org/2sxc/r/oCmPBI3p' target='_blank'>these instructions</a>. <br>"
      + "<br>"
      + "Special note: if your site is running with ssl then you'll want to use <code>npm run local-ssl</code>. Chrome will then complain that it doesn't know the security certificate. "
      + "In this case, first browse to <a href='//localhost:4200/runtime.js' target='_blank'>a file hosted by the local server</a> and tell Chrome it's safe."
      + "</" + appTag + ">";
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