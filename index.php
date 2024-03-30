<?php
/**
 * Plugin Name: Data Table
 * Description: Data Table allows you to create and manage tables on your website..
 * Version: 1.0.0
 * Author: bPlugins LLC
 * Author URI: http://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: data-table
 */

// ABS PATH
if (!defined('ABSPATH')) {
  exit;
}

// Constant
define('BPDT_VERSION', isset($_SERVER['HTTP_HOST']) && 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.0.0');
define('BPDT_DIR_URL', plugin_dir_url(__FILE__));
define('BPDT_DIR_PATH', plugin_dir_path(__FILE__));

require_once BPDT_DIR_PATH . 'inc/block.php';
