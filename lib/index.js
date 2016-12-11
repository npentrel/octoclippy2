"use babel";

import agent from "./agent-manager";

export default {

  config: {
    showOnStartup: {
      type: "boolean",
      "default": true
    },
    playSounds: {
      type: "boolean",
      "default": true
    },
    agent: {
      type: "string",
      "default": "Clippy",
      "enum": ["Octocat", "Hubot", "Clippy", "Bonzi", "F1", "Genie", "Genius", "Links", "Merlin", "Peedy", "Rocky", "Rover"]
    }
  },

  service() {
    return agent.service;
  },

  searchAnimation() {
    console.log("search");
  },

  activate() {
    atom.commands.add("atom-workspace", "clippy:toggle", agent.toggleAgent);
    atom.commands.add("atom-workspace", "clippy:toggle-sounds", agent.toggleSounds);
    atom.commands.add("atom-workspace, .clippy", "clippy:animate", agent.service.animate);
    atom.commands.add("atom-workspace", "clippy:switch-agent-to-octocat", () => agent.showAgent("Octocat"));
    atom.commands.add("atom-workspace", "clippy:switch-agent-to-hubot", () => agent.showAgent("Hubot"));
    atom.commands.add("atom-workspace", "clippy:switch-agent-to-clippy", () => agent.showAgent("Clippy"));
    atom.commands.add("atom-workspace", "clippy:switch-agent-to-bonzi", () => agent.showAgent("Bonzi"));
    atom.commands.add("atom-workspace", "clippy:switch-agent-to-f1", () => agent.showAgent("F1"));
    atom.commands.add("atom-workspace", "clippy:switch-agent-to-genie", () => agent.showAgent("Genie"));
    atom.commands.add("atom-workspace", "clippy:switch-agent-to-genius", () => agent.showAgent("Genius"));
    atom.commands.add("atom-workspace", "clippy:switch-agent-to-links", () => agent.showAgent("Links"));
    atom.commands.add("atom-workspace", "clippy:switch-agent-to-merlin", () => agent.showAgent("Merlin"));
    atom.commands.add("atom-workspace", "clippy:switch-agent-to-peedy", () => agent.showAgent("Peedy"));
    atom.commands.add("atom-workspace", "clippy:switch-agent-to-rocky", () => agent.showAgent("Rocky"));
    atom.commands.add("atom-workspace", "clippy:switch-agent-to-rover", () => agent.showAgent("Rover"));
    atom.commands.add(".clippy", "clippy:animate", agent.service.animate);
    atom.commands.add(".clippy", "clippy:toggle", agent.toggleAgent);
    atom.commands.add("atom-workspace", "clippy:searchAnim", () => agent.service.animate("Searching"));

    if (atom.config.get("clippy.showOnStartup")) {
      setTimeout(agent.showAgent, 1500);
    }

    var textEditors = atom.workspace.getTextEditors();
    for (var i = 0; i < textEditors.length; i++) {
      textEditors[i].getBuffer().onDidSave(function () {
          console.log("saved");
          agent.service.animate("Save");
      });

      textEditors[i].getBuffer().onDidDelete(function () {
          console.log("deleted");
          agent.service.animate("EmptyTrash");
      });
    }

    atom.workspace.onDidAddTextEditor(function({textEditor}) {
        textEditor.getBuffer().onDidSave(function () {
            console.log("saved");
            agent.service.animate("Save");
        });

        textEditor.getBuffer().onDidDelete(function () {
            console.log("deleted");
            agent.service.animate("EmptyTrash");
        });
    });
  }

};
