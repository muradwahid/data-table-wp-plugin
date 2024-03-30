<?php
class BPDTDataTable{
	public function __construct(){
		add_action( 'init', [$this, 'onInit'] );
	}
	function onInit() {
		wp_register_style( 'bpdt-hello-style', BPDT_DIR_URL . 'dist/style.css', [ ], BPDT_VERSION ); // Style
		wp_register_style( 'bpdt-hello-editor-style', BPDT_DIR_URL . 'dist/editor.css', [ 'bpdt-hello-style' ], BPDT_VERSION ); // Backend Style

		register_block_type( __DIR__, [
			'editor_style'		=> 'bpdt-hello-editor-style',
			'render_callback'	=> [$this, 'render']
		] ); // Register Block

		wp_set_script_translations( 'bpdt-hello-editor-script', 'b-blocks', BPDT_DIR_PATH . 'languages' );
	}

	function render( $attributes ){
		extract( $attributes );

		wp_enqueue_style( 'bpdt-hello-style' );
		wp_enqueue_script( 'bpdt-hello-script', BPDT_DIR_URL . 'dist/script.js', [ 'react', 'react-dom' ], BPDT_VERSION, true );
		wp_set_script_translations( 'bpdt-hello-script', 'b-blocks', BPDT_DIR_PATH . 'languages' );

		$className = $className ?? '';
		$blockClassName = "wp-block-bpdt-data-table $className align$align";

		ob_start(); ?>
		<div class='<?php echo esc_attr( $blockClassName ); ?>' id='wp-block-bpdt-data-table-<?php echo esc_attr( $cId ) ?>' data-attributes='<?php echo esc_attr( wp_json_encode( $attributes ) ); ?>'></div>

		<?php return ob_get_clean();
	}
}
new BPDTDataTable();
require_once("ExtendMime.php");