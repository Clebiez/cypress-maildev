const { execFile } = require("node:child_process");
const { promisify } = require("node:util");
const path = require("node:path");

const execFileAsync = promisify(execFile);

module.exports = {
  async fillEmail({ host, port }) {
    const { stdout, stderr } = await execFileAsync(process.execPath, [
      path.join(__dirname, "../fillEmail.js"),
      host,
      String(port),
    ]);

    return { stdout, stderr };
  },
};
