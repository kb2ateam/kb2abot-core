import NodeCache from "node-cache"
import Command from "./Command"

/** Class representing a Plugin */
class Plugin {
	/** create primary command that holds commands */
	commands = new Command({
		plugin: this,
		isPrimary: true
	});

	package = {}; // Add your parsed package.json to this field. Ex: JSON.parse(readFileSync("package.json"))
	config = {}; // Gets a configuration for this plugin, read through "config.json" (PluginManager auto provide)
	userdata = {}; // Gets a userdata for this plugin, read through "userdata.json"  (PluginManager auto provide)

	configTemplate = {};
	userdataTemplate = {};

	constructor(options = {}) {
		this.cache = new NodeCache({
			stdTTL: 600
		})
	}

	/**
	 * Returns a value indicating whether or not this plugin is currently enabled
	 * @readonly
	 * @type {boolean}
	 */
	get isEnabled() {
		return this.enable
	}

	/**
	 * Check plugin is internal or not (Internal plugin will have field "plugins" which can access to all plugins)
	 * @readonly
	 * @type {boolean}
	 */
	get isInternal() {
		return this.package && this.package.name == "kb2abot-plugin-internal"
	}

	/**
	 * Called after this plugin is constructored (you would wrap your "async this.commands.add(command)" in this function in order to load commands in synchronous)
	 * @abstract
	 * @return {Promise} [description]
	 */
	async load() {
		// const Command = await import("./...").default
		// await this.commands.add(new Command())
		// const Commands = (await Promise.all([
		// 	import("../.."),
		// 	import("../..")
		// ])).map(mod => mod.default)
	}

	/**
	 * Called when this plugin is disabled
	 * @abstract
	 */
	onDisable() {}

	/**
	 * Called when this plugin is enabled
	 * @abstract
	 */
	onEnable() {}

	/**
	 * Sets the enabled state of this plugin
	 */
	setEnable() {}
}

export default Plugin