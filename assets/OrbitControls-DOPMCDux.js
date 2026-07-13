import{aI as Lt,aJ as pr,aK as Dt,x as hr,C as Qe,aL as mr,aM as $e,aN as Be,aO as St,aP as hi,z as tn,aQ as Pa,aR as mi,aS as Ut,ao as Je,W as jt,aT as kt,d as wt,aU as Mt,ap as un,V as Ce,aV as _r,aW as pn,a7 as Pn,aX as _i,aY as gr,M as yt,ad as La,aZ as Ze,a_ as vr,P as Mn,a$ as Sr,b0 as Nn,v as je,b1 as It,b2 as Qt,b3 as nn,b4 as hn,b5 as Yt,b6 as Er,b7 as xr,b8 as an,_ as xt,a2 as Zn,b9 as Mr,ba as $t,bb as gi,bc as Tr,bd as Ar,be as sn,bf as br,bg as Rr,bh as Cr,bi as Pr,bj as Lr,bk as Dr,bl as Ur,bm as wr,bn as Ir,bo as Nr,bp as yr,bq as Or,br as Fr,bs as Br,bt as Gr,a1 as Hr,a0 as Vr,Y as yn,X as vn,Z as kr,$ as Xt,bu as Wr,bv as zr,bw as ti,bx as Xr,by as ni,bz as Yr,bA as Kr,bB as qr,bC as Ne,aB as Da,bD as Zr,bE as $r,bF as Ot,R as Tn,bG as An,av as jr,bH as Nt,bI as fn,bJ as Ht,bK as Qr,bL as Ua,bM as wa,bN as Ia,bO as Cn,bP as Na,bQ as ya,bR as Oa,c as Fa,bS as Jr,bT as eo,bU as to,bV as no,bW as Ba,bX as io,bY as ao,bZ as ro,b_ as On,b$ as Fn,c0 as Bn,c1 as Gn,c2 as vi,c3 as Si,c4 as Ei,c5 as xi,c6 as Mi,c7 as Ti,c8 as Ai,c9 as bi,ca as Ri,cb as $n,cc as Ci,cd as Pi,ce as Li,cf as Di,cg as Ui,ch as wi,ci as Ii,cj as Ni,ck as yi,cl as Oi,cm as Fi,cn as Bi,co as Gi,cp as Hi,cq as Vi,cr as ki,cs as Wi,ct as zi,cu as Xi,cv as Yi,cw as jn,cx as Ki,cy as oo,cz as so,cA as lo,cB as co,cC as fo,cD as uo,cE as po,cF as ho,cG as qi,cH as mo,cI as bn,cJ as _o,cK as Zi,cL as $i,cM as ji,cN as Ga,cO as go,cP as Ln,cQ as Qi,cR as vo,cS as Ha,B as ii,cT as Qn,cU as Va,cV as So,cW as ka,cX as Wa,cY as za,A as Xa,cZ as Ya,c_ as Ka,c$ as qa,d0 as Ji,d1 as Za,d2 as Hn,d3 as Vn,d4 as Eo,d5 as xo,d6 as ea,d7 as vt,d8 as Mo,w as $a,d9 as mn,da as rn,a5 as To,db as Ao,dc as bo,dd as Ro,de as Co,df as Po,ak as Lo,dg as Do,dh as Uo,di as wo,dj as Io,dk as en,dl as Jt,Q as ta,dm as na,dn as No,ac as yo}from"./index-Bp8w6iJf.js";/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function ja(){let e=null,n=!1,t=null,i=null;function s(r,f){t(r,f),i=e.requestAnimationFrame(s)}return{start:function(){n!==!0&&t!==null&&e!==null&&(i=e.requestAnimationFrame(s),n=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(i),n=!1},setAnimationLoop:function(r){t=r},setContext:function(r){e=r}}}function Oo(e){const n=new WeakMap;function t(m,b){const M=m.array,k=m.usage,U=M.byteLength,p=e.createBuffer();e.bindBuffer(b,p),e.bufferData(b,M,k),m.onUploadCallback();let S;if(M instanceof Float32Array)S=e.FLOAT;else if(typeof Float16Array<"u"&&M instanceof Float16Array)S=e.HALF_FLOAT;else if(M instanceof Uint16Array)m.isFloat16BufferAttribute?S=e.HALF_FLOAT:S=e.UNSIGNED_SHORT;else if(M instanceof Int16Array)S=e.SHORT;else if(M instanceof Uint32Array)S=e.UNSIGNED_INT;else if(M instanceof Int32Array)S=e.INT;else if(M instanceof Int8Array)S=e.BYTE;else if(M instanceof Uint8Array)S=e.UNSIGNED_BYTE;else if(M instanceof Uint8ClampedArray)S=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+M);return{buffer:p,type:S,bytesPerElement:M.BYTES_PER_ELEMENT,version:m.version,size:U}}function i(m,b,M){const k=b.array,U=b.updateRanges;if(e.bindBuffer(M,m),U.length===0)e.bufferSubData(M,0,k);else{U.sort((S,C)=>S.start-C.start);let p=0;for(let S=1;S<U.length;S++){const C=U[p],G=U[S];G.start<=C.start+C.count+1?C.count=Math.max(C.count,G.start+G.count-C.start):(++p,U[p]=G)}U.length=p+1;for(let S=0,C=U.length;S<C;S++){const G=U[S];e.bufferSubData(M,G.start*k.BYTES_PER_ELEMENT,k,G.start,G.count)}b.clearUpdateRanges()}b.onUploadCallback()}function s(m){return m.isInterleavedBufferAttribute&&(m=m.data),n.get(m)}function r(m){m.isInterleavedBufferAttribute&&(m=m.data);const b=n.get(m);b&&(e.deleteBuffer(b.buffer),n.delete(m))}function f(m,b){if(m.isInterleavedBufferAttribute&&(m=m.data),m.isGLBufferAttribute){const k=n.get(m);(!k||k.version<m.version)&&n.set(m,{buffer:m.buffer,type:m.type,bytesPerElement:m.elementSize,version:m.version});return}const M=n.get(m);if(M===void 0)n.set(m,t(m,b));else if(M.version<m.version){if(M.size!==m.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(M.buffer,m,b),M.version=m.version}}return{get:s,remove:r,update:f}}var Fo=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Bo=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Go=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ho=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Vo=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ko=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Wo=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,zo=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Xo=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Yo=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ko=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,qo=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Zo=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,$o=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,jo=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Qo=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Jo=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,es=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ts=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ns=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,is=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,as=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,rs=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,os=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,ss=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,ls=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,cs=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,fs=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ds=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,us=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ps="gl_FragColor = linearToOutputTexel( gl_FragColor );",hs=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ms=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,_s=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,gs=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,vs=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ss=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Es=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,xs=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ms=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ts=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,As=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,bs=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Rs=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Cs=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ps=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Ls=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Ds=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Us=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ws=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Is=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ns=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,ys=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Os=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Fs=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Bs=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Gs=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Hs=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Vs=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ks=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ws=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,zs=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Xs=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ys=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Ks=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,qs=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Zs=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,$s=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,js=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Qs=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Js=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,el=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tl=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,nl=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,il=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,al=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rl=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,ol=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,sl=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ll=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,cl=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,fl=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,dl=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ul=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,pl=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,hl=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ml=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,_l=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,gl=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,vl=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Sl=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,El=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,xl=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Ml=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Tl=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Al=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,bl=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Rl=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Cl=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Pl=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ll=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Dl=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ul=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,wl=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Il=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Nl=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,yl=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Ol=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Fl=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Bl=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gl=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hl=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vl=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kl=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wl=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,zl=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Xl=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Yl=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Kl=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ql=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zl=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,$l=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,jl=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Ql=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jl=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ec=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tc=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,nc=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ic=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,ac=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,rc=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,oc=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sc=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,lc=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cc=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fc=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dc=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,uc=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,pc=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hc=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,mc=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,_c=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ue={alphahash_fragment:Fo,alphahash_pars_fragment:Bo,alphamap_fragment:Go,alphamap_pars_fragment:Ho,alphatest_fragment:Vo,alphatest_pars_fragment:ko,aomap_fragment:Wo,aomap_pars_fragment:zo,batching_pars_vertex:Xo,batching_vertex:Yo,begin_vertex:Ko,beginnormal_vertex:qo,bsdfs:Zo,iridescence_fragment:$o,bumpmap_pars_fragment:jo,clipping_planes_fragment:Qo,clipping_planes_pars_fragment:Jo,clipping_planes_pars_vertex:es,clipping_planes_vertex:ts,color_fragment:ns,color_pars_fragment:is,color_pars_vertex:as,color_vertex:rs,common:os,cube_uv_reflection_fragment:ss,defaultnormal_vertex:ls,displacementmap_pars_vertex:cs,displacementmap_vertex:fs,emissivemap_fragment:ds,emissivemap_pars_fragment:us,colorspace_fragment:ps,colorspace_pars_fragment:hs,envmap_fragment:ms,envmap_common_pars_fragment:_s,envmap_pars_fragment:gs,envmap_pars_vertex:vs,envmap_physical_pars_fragment:Ls,envmap_vertex:Ss,fog_vertex:Es,fog_pars_vertex:xs,fog_fragment:Ms,fog_pars_fragment:Ts,gradientmap_pars_fragment:As,lightmap_pars_fragment:bs,lights_lambert_fragment:Rs,lights_lambert_pars_fragment:Cs,lights_pars_begin:Ps,lights_toon_fragment:Ds,lights_toon_pars_fragment:Us,lights_phong_fragment:ws,lights_phong_pars_fragment:Is,lights_physical_fragment:Ns,lights_physical_pars_fragment:ys,lights_fragment_begin:Os,lights_fragment_maps:Fs,lights_fragment_end:Bs,lightprobes_pars_fragment:Gs,logdepthbuf_fragment:Hs,logdepthbuf_pars_fragment:Vs,logdepthbuf_pars_vertex:ks,logdepthbuf_vertex:Ws,map_fragment:zs,map_pars_fragment:Xs,map_particle_fragment:Ys,map_particle_pars_fragment:Ks,metalnessmap_fragment:qs,metalnessmap_pars_fragment:Zs,morphinstance_vertex:$s,morphcolor_vertex:js,morphnormal_vertex:Qs,morphtarget_pars_vertex:Js,morphtarget_vertex:el,normal_fragment_begin:tl,normal_fragment_maps:nl,normal_pars_fragment:il,normal_pars_vertex:al,normal_vertex:rl,normalmap_pars_fragment:ol,clearcoat_normal_fragment_begin:sl,clearcoat_normal_fragment_maps:ll,clearcoat_pars_fragment:cl,iridescence_pars_fragment:fl,opaque_fragment:dl,packing:ul,premultiplied_alpha_fragment:pl,project_vertex:hl,dithering_fragment:ml,dithering_pars_fragment:_l,roughnessmap_fragment:gl,roughnessmap_pars_fragment:vl,shadowmap_pars_fragment:Sl,shadowmap_pars_vertex:El,shadowmap_vertex:xl,shadowmask_pars_fragment:Ml,skinbase_vertex:Tl,skinning_pars_vertex:Al,skinning_vertex:bl,skinnormal_vertex:Rl,specularmap_fragment:Cl,specularmap_pars_fragment:Pl,tonemapping_fragment:Ll,tonemapping_pars_fragment:Dl,transmission_fragment:Ul,transmission_pars_fragment:wl,uv_pars_fragment:Il,uv_pars_vertex:Nl,uv_vertex:yl,worldpos_vertex:Ol,background_vert:Fl,background_frag:Bl,backgroundCube_vert:Gl,backgroundCube_frag:Hl,cube_vert:Vl,cube_frag:kl,depth_vert:Wl,depth_frag:zl,distance_vert:Xl,distance_frag:Yl,equirect_vert:Kl,equirect_frag:ql,linedashed_vert:Zl,linedashed_frag:$l,meshbasic_vert:jl,meshbasic_frag:Ql,meshlambert_vert:Jl,meshlambert_frag:ec,meshmatcap_vert:tc,meshmatcap_frag:nc,meshnormal_vert:ic,meshnormal_frag:ac,meshphong_vert:rc,meshphong_frag:oc,meshphysical_vert:sc,meshphysical_frag:lc,meshtoon_vert:cc,meshtoon_frag:fc,points_vert:dc,points_frag:uc,shadow_vert:pc,shadow_frag:hc,sprite_vert:mc,sprite_frag:_c},se={common:{diffuse:{value:new Qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ne}},envmap:{envMap:{value:null},envMapRotation:{value:new Ne},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ne}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ne}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ne},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ne},normalScale:{value:new je(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ne},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ne}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ne}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ne}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new Ce},probesMax:{value:new Ce},probesResolution:{value:new Ce}},points:{diffuse:{value:new Qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0},uvTransform:{value:new Ne}},sprite:{diffuse:{value:new Qe(16777215)},opacity:{value:1},center:{value:new je(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}}},Pt={basic:{uniforms:vt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.fog]),vertexShader:Ue.meshbasic_vert,fragmentShader:Ue.meshbasic_frag},lambert:{uniforms:vt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new Qe(0)},envMapIntensity:{value:1}}]),vertexShader:Ue.meshlambert_vert,fragmentShader:Ue.meshlambert_frag},phong:{uniforms:vt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new Qe(0)},specular:{value:new Qe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ue.meshphong_vert,fragmentShader:Ue.meshphong_frag},standard:{uniforms:vt([se.common,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.roughnessmap,se.metalnessmap,se.fog,se.lights,{emissive:{value:new Qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ue.meshphysical_vert,fragmentShader:Ue.meshphysical_frag},toon:{uniforms:vt([se.common,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.gradientmap,se.fog,se.lights,{emissive:{value:new Qe(0)}}]),vertexShader:Ue.meshtoon_vert,fragmentShader:Ue.meshtoon_frag},matcap:{uniforms:vt([se.common,se.bumpmap,se.normalmap,se.displacementmap,se.fog,{matcap:{value:null}}]),vertexShader:Ue.meshmatcap_vert,fragmentShader:Ue.meshmatcap_frag},points:{uniforms:vt([se.points,se.fog]),vertexShader:Ue.points_vert,fragmentShader:Ue.points_frag},dashed:{uniforms:vt([se.common,se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ue.linedashed_vert,fragmentShader:Ue.linedashed_frag},depth:{uniforms:vt([se.common,se.displacementmap]),vertexShader:Ue.depth_vert,fragmentShader:Ue.depth_frag},normal:{uniforms:vt([se.common,se.bumpmap,se.normalmap,se.displacementmap,{opacity:{value:1}}]),vertexShader:Ue.meshnormal_vert,fragmentShader:Ue.meshnormal_frag},sprite:{uniforms:vt([se.sprite,se.fog]),vertexShader:Ue.sprite_vert,fragmentShader:Ue.sprite_frag},background:{uniforms:{uvTransform:{value:new Ne},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ue.background_vert,fragmentShader:Ue.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ne}},vertexShader:Ue.backgroundCube_vert,fragmentShader:Ue.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ue.cube_vert,fragmentShader:Ue.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ue.equirect_vert,fragmentShader:Ue.equirect_frag},distance:{uniforms:vt([se.common,se.displacementmap,{referencePosition:{value:new Ce},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ue.distance_vert,fragmentShader:Ue.distance_frag},shadow:{uniforms:vt([se.lights,se.fog,{color:{value:new Qe(0)},opacity:{value:1}}]),vertexShader:Ue.shadow_vert,fragmentShader:Ue.shadow_frag}};Pt.physical={uniforms:vt([Pt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ne},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ne},clearcoatNormalScale:{value:new je(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ne},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ne},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ne},sheen:{value:0},sheenColor:{value:new Qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ne},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ne},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ne},transmissionSamplerSize:{value:new je},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ne},attenuationDistance:{value:0},attenuationColor:{value:new Qe(0)},specularColor:{value:new Qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ne},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ne},anisotropyVector:{value:new je},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ne}}]),vertexShader:Ue.meshphysical_vert,fragmentShader:Ue.meshphysical_frag};const Sn={r:0,b:0,g:0},gc=new tn,Qa=new Ne;Qa.set(-1,0,0,0,1,0,0,0,1);function vc(e,n,t,i,s,r){const f=new Qe(0);let m=s===!0?0:1,b,M,k=null,U=0,p=null;function S(O){let y=O.isScene===!0?O.background:null;if(y&&y.isTexture){const h=O.backgroundBlurriness>0;y=n.get(y,h)}return y}function C(O){let y=!1;const h=S(O);h===null?d(f,m):h&&h.isColor&&(d(h,1),y=!0);const A=e.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(e.autoClear||y)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function G(O,y){const h=S(y);h&&(h.isCubeTexture||h.mapping===Ln)?(M===void 0&&(M=new yt(new ii(1,1,1),new Ot({name:"BackgroundCubeMaterial",uniforms:Qn(Pt.backgroundCube.uniforms),vertexShader:Pt.backgroundCube.vertexShader,fragmentShader:Pt.backgroundCube.fragmentShader,side:Mt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),M.geometry.deleteAttribute("normal"),M.geometry.deleteAttribute("uv"),M.onBeforeRender=function(A,g,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(M.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(M)),M.material.uniforms.envMap.value=h,M.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,M.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,M.material.uniforms.backgroundRotation.value.setFromMatrix4(gc.makeRotationFromEuler(y.backgroundRotation)).transpose(),h.isCubeTexture&&h.isRenderTargetTexture===!1&&M.material.uniforms.backgroundRotation.value.premultiply(Qa),M.material.toneMapped=Je.getTransfer(h.colorSpace)!==Ze,(k!==h||U!==h.version||p!==e.toneMapping)&&(M.material.needsUpdate=!0,k=h,U=h.version,p=e.toneMapping),M.layers.enableAll(),O.unshift(M,M.geometry,M.material,0,0,null)):h&&h.isTexture&&(b===void 0&&(b=new yt(new Fa(2,2),new Ot({name:"BackgroundMaterial",uniforms:Qn(Pt.background.uniforms),vertexShader:Pt.background.vertexShader,fragmentShader:Pt.background.fragmentShader,side:un,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),b.geometry.deleteAttribute("normal"),Object.defineProperty(b.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(b)),b.material.uniforms.t2D.value=h,b.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,b.material.toneMapped=Je.getTransfer(h.colorSpace)!==Ze,h.matrixAutoUpdate===!0&&h.updateMatrix(),b.material.uniforms.uvTransform.value.copy(h.matrix),(k!==h||U!==h.version||p!==e.toneMapping)&&(b.material.needsUpdate=!0,k=h,U=h.version,p=e.toneMapping),b.layers.enableAll(),O.unshift(b,b.geometry,b.material,0,0,null))}function d(O,y){O.getRGB(Sn,Ha(e)),t.buffers.color.setClear(Sn.r,Sn.g,Sn.b,y,r)}function l(){M!==void 0&&(M.geometry.dispose(),M.material.dispose(),M=void 0),b!==void 0&&(b.geometry.dispose(),b.material.dispose(),b=void 0)}return{getClearColor:function(){return f},setClearColor:function(O,y=1){f.set(O),m=y,d(f,m)},getClearAlpha:function(){return m},setClearAlpha:function(O){m=O,d(f,m)},render:C,addToRenderList:G,dispose:l}}function Sc(e,n){const t=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},s=p(null);let r=s,f=!1;function m(R,F,j,Z,W){let Y=!1;const V=U(R,Z,j,F);r!==V&&(r=V,M(r.object)),Y=S(R,Z,j,W),Y&&C(R,Z,j,W),W!==null&&n.update(W,e.ELEMENT_ARRAY_BUFFER),(Y||f)&&(f=!1,h(R,F,j,Z),W!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,n.get(W).buffer))}function b(){return e.createVertexArray()}function M(R){return e.bindVertexArray(R)}function k(R){return e.deleteVertexArray(R)}function U(R,F,j,Z){const W=Z.wireframe===!0;let Y=i[F.id];Y===void 0&&(Y={},i[F.id]=Y);const V=R.isInstancedMesh===!0?R.id:0;let $=Y[V];$===void 0&&($={},Y[V]=$);let ce=$[j.id];ce===void 0&&(ce={},$[j.id]=ce);let ge=ce[W];return ge===void 0&&(ge=p(b()),ce[W]=ge),ge}function p(R){const F=[],j=[],Z=[];for(let W=0;W<t;W++)F[W]=0,j[W]=0,Z[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:j,attributeDivisors:Z,object:R,attributes:{},index:null}}function S(R,F,j,Z){const W=r.attributes,Y=F.attributes;let V=0;const $=j.getAttributes();for(const ce in $)if($[ce].location>=0){const ve=W[ce];let xe=Y[ce];if(xe===void 0&&(ce==="instanceMatrix"&&R.instanceMatrix&&(xe=R.instanceMatrix),ce==="instanceColor"&&R.instanceColor&&(xe=R.instanceColor)),ve===void 0||ve.attribute!==xe||xe&&ve.data!==xe.data)return!0;V++}return r.attributesNum!==V||r.index!==Z}function C(R,F,j,Z){const W={},Y=F.attributes;let V=0;const $=j.getAttributes();for(const ce in $)if($[ce].location>=0){let ve=Y[ce];ve===void 0&&(ce==="instanceMatrix"&&R.instanceMatrix&&(ve=R.instanceMatrix),ce==="instanceColor"&&R.instanceColor&&(ve=R.instanceColor));const xe={};xe.attribute=ve,ve&&ve.data&&(xe.data=ve.data),W[ce]=xe,V++}r.attributes=W,r.attributesNum=V,r.index=Z}function G(){const R=r.newAttributes;for(let F=0,j=R.length;F<j;F++)R[F]=0}function d(R){l(R,0)}function l(R,F){const j=r.newAttributes,Z=r.enabledAttributes,W=r.attributeDivisors;j[R]=1,Z[R]===0&&(e.enableVertexAttribArray(R),Z[R]=1),W[R]!==F&&(e.vertexAttribDivisor(R,F),W[R]=F)}function O(){const R=r.newAttributes,F=r.enabledAttributes;for(let j=0,Z=F.length;j<Z;j++)F[j]!==R[j]&&(e.disableVertexAttribArray(j),F[j]=0)}function y(R,F,j,Z,W,Y,V){V===!0?e.vertexAttribIPointer(R,F,j,W,Y):e.vertexAttribPointer(R,F,j,Z,W,Y)}function h(R,F,j,Z){G();const W=Z.attributes,Y=j.getAttributes(),V=F.defaultAttributeValues;for(const $ in Y){const ce=Y[$];if(ce.location>=0){let ge=W[$];if(ge===void 0&&($==="instanceMatrix"&&R.instanceMatrix&&(ge=R.instanceMatrix),$==="instanceColor"&&R.instanceColor&&(ge=R.instanceColor)),ge!==void 0){const ve=ge.normalized,xe=ge.itemSize,Ye=n.get(ge);if(Ye===void 0)continue;const ot=Ye.buffer,He=Ye.type,K=Ye.bytesPerElement,te=He===e.INT||He===e.UNSIGNED_INT||ge.gpuType===Ba;if(ge.isInterleavedBufferAttribute){const Q=ge.data,Re=Q.stride,Pe=ge.offset;if(Q.isInstancedInterleavedBuffer){for(let Ae=0;Ae<ce.locationSize;Ae++)l(ce.location+Ae,Q.meshPerAttribute);R.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let Ae=0;Ae<ce.locationSize;Ae++)d(ce.location+Ae);e.bindBuffer(e.ARRAY_BUFFER,ot);for(let Ae=0;Ae<ce.locationSize;Ae++)y(ce.location+Ae,xe/ce.locationSize,He,ve,Re*K,(Pe+xe/ce.locationSize*Ae)*K,te)}else{if(ge.isInstancedBufferAttribute){for(let Q=0;Q<ce.locationSize;Q++)l(ce.location+Q,ge.meshPerAttribute);R.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=ge.meshPerAttribute*ge.count)}else for(let Q=0;Q<ce.locationSize;Q++)d(ce.location+Q);e.bindBuffer(e.ARRAY_BUFFER,ot);for(let Q=0;Q<ce.locationSize;Q++)y(ce.location+Q,xe/ce.locationSize,He,ve,xe*K,xe/ce.locationSize*Q*K,te)}}else if(V!==void 0){const ve=V[$];if(ve!==void 0)switch(ve.length){case 2:e.vertexAttrib2fv(ce.location,ve);break;case 3:e.vertexAttrib3fv(ce.location,ve);break;case 4:e.vertexAttrib4fv(ce.location,ve);break;default:e.vertexAttrib1fv(ce.location,ve)}}}}O()}function A(){_();for(const R in i){const F=i[R];for(const j in F){const Z=F[j];for(const W in Z){const Y=Z[W];for(const V in Y)k(Y[V].object),delete Y[V];delete Z[W]}}delete i[R]}}function g(R){if(i[R.id]===void 0)return;const F=i[R.id];for(const j in F){const Z=F[j];for(const W in Z){const Y=Z[W];for(const V in Y)k(Y[V].object),delete Y[V];delete Z[W]}}delete i[R.id]}function P(R){for(const F in i){const j=i[F];for(const Z in j){const W=j[Z];if(W[R.id]===void 0)continue;const Y=W[R.id];for(const V in Y)k(Y[V].object),delete Y[V];delete W[R.id]}}}function c(R){for(const F in i){const j=i[F],Z=R.isInstancedMesh===!0?R.id:0,W=j[Z];if(W!==void 0){for(const Y in W){const V=W[Y];for(const $ in V)k(V[$].object),delete V[$];delete W[Y]}delete j[Z],Object.keys(j).length===0&&delete i[F]}}}function _(){I(),f=!0,r!==s&&(r=s,M(r.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:m,reset:_,resetDefaultState:I,dispose:A,releaseStatesOfGeometry:g,releaseStatesOfObject:c,releaseStatesOfProgram:P,initAttributes:G,enableAttribute:d,disableUnusedAttributes:O}}function Ec(e,n,t){let i;function s(b){i=b}function r(b,M){e.drawArrays(i,b,M),t.update(M,i,1)}function f(b,M,k){k!==0&&(e.drawArraysInstanced(i,b,M,k),t.update(M,i,k))}function m(b,M,k){if(k===0)return;n.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,b,0,M,0,k);let p=0;for(let S=0;S<k;S++)p+=M[S];t.update(p,i,1)}this.setMode=s,this.render=r,this.renderInstances=f,this.renderMultiDraw=m}function xc(e,n,t,i){let s;function r(){if(s!==void 0)return s;if(n.has("EXT_texture_filter_anisotropic")===!0){const P=n.get("EXT_texture_filter_anisotropic");s=e.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function f(P){return!(P!==It&&i.convert(P)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function m(P){const c=P===kt&&(n.has("EXT_color_buffer_half_float")||n.has("EXT_color_buffer_float"));return!(P!==Lt&&i.convert(P)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==Ht&&!c)}function b(P){if(P==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let M=t.precision!==void 0?t.precision:"highp";const k=b(M);k!==M&&(Be("WebGLRenderer:",M,"not supported, using",k,"instead."),M=k);const U=t.logarithmicDepthBuffer===!0,p=t.reversedDepthBuffer===!0&&n.has("EXT_clip_control");t.reversedDepthBuffer===!0&&p===!1&&Be("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const S=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),C=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),G=e.getParameter(e.MAX_TEXTURE_SIZE),d=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),l=e.getParameter(e.MAX_VERTEX_ATTRIBS),O=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),h=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),A=e.getParameter(e.MAX_SAMPLES),g=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:b,textureFormatReadable:f,textureTypeReadable:m,precision:M,logarithmicDepthBuffer:U,reversedDepthBuffer:p,maxTextures:S,maxVertexTextures:C,maxTextureSize:G,maxCubemapSize:d,maxAttributes:l,maxVertexUniforms:O,maxVaryings:y,maxFragmentUniforms:h,maxSamples:A,samples:g}}function Mc(e){const n=this;let t=null,i=0,s=!1,r=!1;const f=new Da,m=new Ne,b={value:null,needsUpdate:!1};this.uniform=b,this.numPlanes=0,this.numIntersection=0,this.init=function(U,p){const S=U.length!==0||p||i!==0||s;return s=p,i=U.length,S},this.beginShadows=function(){r=!0,k(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(U,p){t=k(U,p,0)},this.setState=function(U,p,S){const C=U.clippingPlanes,G=U.clipIntersection,d=U.clipShadows,l=e.get(U);if(!s||C===null||C.length===0||r&&!d)r?k(null):M();else{const O=r?0:i,y=O*4;let h=l.clippingState||null;b.value=h,h=k(C,p,y,S);for(let A=0;A!==y;++A)h[A]=t[A];l.clippingState=h,this.numIntersection=G?this.numPlanes:0,this.numPlanes+=O}};function M(){b.value!==t&&(b.value=t,b.needsUpdate=i>0),n.numPlanes=i,n.numIntersection=0}function k(U,p,S,C){const G=U!==null?U.length:0;let d=null;if(G!==0){if(d=b.value,C!==!0||d===null){const l=S+G*4,O=p.matrixWorldInverse;m.getNormalMatrix(O),(d===null||d.length<l)&&(d=new Float32Array(l));for(let y=0,h=S;y!==G;++y,h+=4)f.copy(U[y]).applyMatrix4(O,m),f.normal.toArray(d,h),d[h+3]=f.constant}b.value=d,b.needsUpdate=!0}return n.numPlanes=G,n.numIntersection=0,d}}const Vt=4,ia=[.125,.215,.35,.446,.526,.582],zt=20,Tc=256,ln=new La,aa=new Qe;let kn=null,Wn=0,zn=0,Xn=!1;const Ac=new Ce;class ra{constructor(n){this._renderer=n,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(n,t=0,i=.1,s=100,r={}){const{size:f=256,position:m=Ac}=r;kn=this._renderer.getRenderTarget(),Wn=this._renderer.getActiveCubeFace(),zn=this._renderer.getActiveMipmapLevel(),Xn=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(f);const b=this._allocateTargets();return b.depthBuffer=!0,this._sceneToCubeUV(n,i,s,b,m),t>0&&this._blur(b,0,0,t),this._applyPMREM(b),this._cleanup(b),b}fromEquirectangular(n,t=null){return this._fromTexture(n,t)}fromCubemap(n,t=null){return this._fromTexture(n,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=la(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=sa(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(n){this._lodMax=Math.floor(Math.log2(n)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let n=0;n<this._lodMeshes.length;n++)this._lodMeshes[n].geometry.dispose()}_cleanup(n){this._renderer.setRenderTarget(kn,Wn,zn),this._renderer.xr.enabled=Xn,n.scissorTest=!1,Zt(n,0,0,n.width,n.height)}_fromTexture(n,t){n.mapping===mn||n.mapping===rn?this._setSize(n.image.length===0?16:n.image[0].width||n.image[0].image.width):this._setSize(n.image.width/4),kn=this._renderer.getRenderTarget(),Wn=this._renderer.getActiveCubeFace(),zn=this._renderer.getActiveMipmapLevel(),Xn=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(n,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const n=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:xt,minFilter:xt,generateMipmaps:!1,type:kt,format:It,colorSpace:$a,depthBuffer:!1},s=oa(n,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==n||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=oa(n,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=bc(r)),this._blurMaterial=Cc(r,n,t),this._ggxMaterial=Rc(r,n,t)}return s}_compileMaterial(n){const t=new yt(new Pn,n);this._renderer.compile(t,ln)}_sceneToCubeUV(n,t,i,s,r){const b=new Mn(90,1,t,i),M=[1,-1,1,1,1,1],k=[1,1,1,-1,-1,-1],U=this._renderer,p=U.autoClear,S=U.toneMapping;U.getClearColor(aa),U.toneMapping=Dt,U.autoClear=!1,U.state.buffers.depth.getReversed()&&(U.setRenderTarget(s),U.clearDepth(),U.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new yt(new ii,new To({name:"PMREM.Background",side:Mt,depthWrite:!1,depthTest:!1})));const G=this._backgroundBox,d=G.material;let l=!1;const O=n.background;O?O.isColor&&(d.color.copy(O),n.background=null,l=!0):(d.color.copy(aa),l=!0);for(let y=0;y<6;y++){const h=y%3;h===0?(b.up.set(0,M[y],0),b.position.set(r.x,r.y,r.z),b.lookAt(r.x+k[y],r.y,r.z)):h===1?(b.up.set(0,0,M[y]),b.position.set(r.x,r.y,r.z),b.lookAt(r.x,r.y+k[y],r.z)):(b.up.set(0,M[y],0),b.position.set(r.x,r.y,r.z),b.lookAt(r.x,r.y,r.z+k[y]));const A=this._cubeSize;Zt(s,h*A,y>2?A:0,A,A),U.setRenderTarget(s),l&&U.render(G,b),U.render(n,b)}U.toneMapping=S,U.autoClear=p,n.background=O}_textureToCubeUV(n,t){const i=this._renderer,s=n.mapping===mn||n.mapping===rn;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=la()),this._cubemapMaterial.uniforms.flipEnvMap.value=n.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=sa());const r=s?this._cubemapMaterial:this._equirectMaterial,f=this._lodMeshes[0];f.material=r;const m=r.uniforms;m.envMap.value=n;const b=this._cubeSize;Zt(t,0,0,3*b,2*b),i.setRenderTarget(t),i.render(f,ln)}_applyPMREM(n){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(n,r-1,r);t.autoClear=i}_applyGGXFilter(n,t,i){const s=this._renderer,r=this._pingPongRenderTarget,f=this._ggxMaterial,m=this._lodMeshes[i];m.material=f;const b=f.uniforms,M=i/(this._lodMeshes.length-1),k=t/(this._lodMeshes.length-1),U=Math.sqrt(M*M-k*k),p=0+M*1.25,S=U*p,{_lodMax:C}=this,G=this._sizeLods[i],d=3*G*(i>C-Vt?i-C+Vt:0),l=4*(this._cubeSize-G);b.envMap.value=n.texture,b.roughness.value=S,b.mipInt.value=C-t,Zt(r,d,l,3*G,2*G),s.setRenderTarget(r),s.render(m,ln),b.envMap.value=r.texture,b.roughness.value=0,b.mipInt.value=C-i,Zt(n,d,l,3*G,2*G),s.setRenderTarget(n),s.render(m,ln)}_blur(n,t,i,s,r){const f=this._pingPongRenderTarget;this._halfBlur(n,f,t,i,s,"latitudinal",r),this._halfBlur(f,n,i,i,s,"longitudinal",r)}_halfBlur(n,t,i,s,r,f,m){const b=this._renderer,M=this._blurMaterial;f!=="latitudinal"&&f!=="longitudinal"&&$e("blur direction must be either latitudinal or longitudinal!");const k=3,U=this._lodMeshes[s];U.material=M;const p=M.uniforms,S=this._sizeLods[i]-1,C=isFinite(r)?Math.PI/(2*S):2*Math.PI/(2*zt-1),G=r/C,d=isFinite(r)?1+Math.floor(k*G):zt;d>zt&&Be(`sigmaRadians, ${r}, is too large and will clip, as it requested ${d} samples when the maximum is set to ${zt}`);const l=[];let O=0;for(let P=0;P<zt;++P){const c=P/G,_=Math.exp(-c*c/2);l.push(_),P===0?O+=_:P<d&&(O+=2*_)}for(let P=0;P<l.length;P++)l[P]=l[P]/O;p.envMap.value=n.texture,p.samples.value=d,p.weights.value=l,p.latitudinal.value=f==="latitudinal",m&&(p.poleAxis.value=m);const{_lodMax:y}=this;p.dTheta.value=C,p.mipInt.value=y-i;const h=this._sizeLods[s],A=3*h*(s>y-Vt?s-y+Vt:0),g=4*(this._cubeSize-h);Zt(t,A,g,3*h,2*h),b.setRenderTarget(t),b.render(U,ln)}}function bc(e){const n=[],t=[],i=[];let s=e;const r=e-Vt+1+ia.length;for(let f=0;f<r;f++){const m=Math.pow(2,s);n.push(m);let b=1/m;f>e-Vt?b=ia[f-e+Vt-1]:f===0&&(b=0),t.push(b);const M=1/(m-2),k=-M,U=1+M,p=[k,k,U,k,U,U,k,k,U,U,k,U],S=6,C=6,G=3,d=2,l=1,O=new Float32Array(G*C*S),y=new Float32Array(d*C*S),h=new Float32Array(l*C*S);for(let g=0;g<S;g++){const P=g%3*2/3-1,c=g>2?0:-1,_=[P,c,0,P+2/3,c,0,P+2/3,c+1,0,P,c,0,P+2/3,c+1,0,P,c+1,0];O.set(_,G*C*g),y.set(p,d*C*g);const I=[g,g,g,g,g,g];h.set(I,l*C*g)}const A=new Pn;A.setAttribute("position",new Tn(O,G)),A.setAttribute("uv",new Tn(y,d)),A.setAttribute("faceIndex",new Tn(h,l)),i.push(new yt(A,null)),s>Vt&&s--}return{lodMeshes:i,sizeLods:n,sigmas:t}}function oa(e,n,t){const i=new Ut(e,n,t);return i.texture.mapping=Ln,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Zt(e,n,t,i,s){e.viewport.set(n,t,i,s),e.scissor.set(n,t,i,s)}function Rc(e,n,t){return new Ot({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Tc,CUBEUV_TEXEL_WIDTH:1/n,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Dn(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Nt,depthTest:!1,depthWrite:!1})}function Cc(e,n,t){const i=new Float32Array(zt),s=new Ce(0,1,0);return new Ot({name:"SphericalGaussianBlur",defines:{n:zt,CUBEUV_TEXEL_WIDTH:1/n,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Dn(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Nt,depthTest:!1,depthWrite:!1})}function sa(){return new Ot({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Dn(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Nt,depthTest:!1,depthWrite:!1})}function la(){return new Ot({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Dn(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Nt,depthTest:!1,depthWrite:!1})}function Dn(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Ja extends Ut{constructor(n=1,t={}){super(n,n,t),this.isWebGLCubeRenderTarget=!0;const i={width:n,height:n,depth:1},s=[i,i,i,i,i,i];this.texture=new Va(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(n,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new ii(5,5,5),r=new Ot({name:"CubemapFromEquirect",uniforms:Qn(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Mt,blending:Nt});r.uniforms.tEquirect.value=t;const f=new yt(s,r),m=t.minFilter;return t.minFilter===jt&&(t.minFilter=xt),new So(1,10,this).update(n,f),t.minFilter=m,f.geometry.dispose(),f.material.dispose(),this}clear(n,t=!0,i=!0,s=!0){const r=n.getRenderTarget();for(let f=0;f<6;f++)n.setRenderTarget(this,f),n.clear(t,i,s);n.setRenderTarget(r)}}function Pc(e){let n=new WeakMap,t=new WeakMap,i=null;function s(p,S=!1){return p==null?null:S?f(p):r(p)}function r(p){if(p&&p.isTexture){const S=p.mapping;if(S===Hn||S===Vn)if(n.has(p)){const C=n.get(p).texture;return m(C,p.mapping)}else{const C=p.image;if(C&&C.height>0){const G=new Ja(C.height);return G.fromEquirectangularTexture(e,p),n.set(p,G),p.addEventListener("dispose",M),m(G.texture,p.mapping)}else return null}}return p}function f(p){if(p&&p.isTexture){const S=p.mapping,C=S===Hn||S===Vn,G=S===mn||S===rn;if(C||G){let d=t.get(p);const l=d!==void 0?d.texture.pmremVersion:0;if(p.isRenderTargetTexture&&p.pmremVersion!==l)return i===null&&(i=new ra(e)),d=C?i.fromEquirectangular(p,d):i.fromCubemap(p,d),d.texture.pmremVersion=p.pmremVersion,t.set(p,d),d.texture;if(d!==void 0)return d.texture;{const O=p.image;return C&&O&&O.height>0||G&&O&&b(O)?(i===null&&(i=new ra(e)),d=C?i.fromEquirectangular(p):i.fromCubemap(p),d.texture.pmremVersion=p.pmremVersion,t.set(p,d),p.addEventListener("dispose",k),d.texture):null}}}return p}function m(p,S){return S===Hn?p.mapping=mn:S===Vn&&(p.mapping=rn),p}function b(p){let S=0;const C=6;for(let G=0;G<C;G++)p[G]!==void 0&&S++;return S===C}function M(p){const S=p.target;S.removeEventListener("dispose",M);const C=n.get(S);C!==void 0&&(n.delete(S),C.dispose())}function k(p){const S=p.target;S.removeEventListener("dispose",k);const C=t.get(S);C!==void 0&&(t.delete(S),C.dispose())}function U(){n=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:U}}function Lc(e){const n={};function t(i){if(n[i]!==void 0)return n[i];const s=e.getExtension(i);return n[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&Mr("WebGLRenderer: "+i+" extension not supported."),s}}}function Dc(e,n,t,i){const s={},r=new WeakMap;function f(U){const p=U.target;p.index!==null&&n.remove(p.index);for(const C in p.attributes)n.remove(p.attributes[C]);p.removeEventListener("dispose",f),delete s[p.id];const S=r.get(p);S&&(n.remove(S),r.delete(p)),i.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function m(U,p){return s[p.id]===!0||(p.addEventListener("dispose",f),s[p.id]=!0,t.memory.geometries++),p}function b(U){const p=U.attributes;for(const S in p)n.update(p[S],e.ARRAY_BUFFER)}function M(U){const p=[],S=U.index,C=U.attributes.position;let G=0;if(C===void 0)return;if(S!==null){const O=S.array;G=S.version;for(let y=0,h=O.length;y<h;y+=3){const A=O[y+0],g=O[y+1],P=O[y+2];p.push(A,g,g,P,P,A)}}else{const O=C.array;G=C.version;for(let y=0,h=O.length/3-1;y<h;y+=3){const A=y+0,g=y+1,P=y+2;p.push(A,g,g,P,P,A)}}const d=new(C.count>=65535?Eo:xo)(p,1);d.version=G;const l=r.get(U);l&&n.remove(l),r.set(U,d)}function k(U){const p=r.get(U);if(p){const S=U.index;S!==null&&p.version<S.version&&M(U)}else M(U);return r.get(U)}return{get:m,update:b,getWireframeAttribute:k}}function Uc(e,n,t){let i;function s(U){i=U}let r,f;function m(U){r=U.type,f=U.bytesPerElement}function b(U,p){e.drawElements(i,p,r,U*f),t.update(p,i,1)}function M(U,p,S){S!==0&&(e.drawElementsInstanced(i,p,r,U*f,S),t.update(p,i,S))}function k(U,p,S){if(S===0)return;n.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,r,U,0,S);let G=0;for(let d=0;d<S;d++)G+=p[d];t.update(G,i,1)}this.setMode=s,this.setIndex=m,this.render=b,this.renderInstances=M,this.renderMultiDraw=k}function wc(e){const n={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,f,m){switch(t.calls++,f){case e.TRIANGLES:t.triangles+=m*(r/3);break;case e.LINES:t.lines+=m*(r/2);break;case e.LINE_STRIP:t.lines+=m*(r-1);break;case e.LINE_LOOP:t.lines+=m*r;break;case e.POINTS:t.points+=m*r;break;default:$e("WebGLInfo: Unknown draw mode:",f);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:n,render:t,programs:null,autoReset:!0,reset:s,update:i}}function Ic(e,n,t){const i=new WeakMap,s=new St;function r(f,m,b){const M=f.morphTargetInfluences,k=m.morphAttributes.position||m.morphAttributes.normal||m.morphAttributes.color,U=k!==void 0?k.length:0;let p=i.get(m);if(p===void 0||p.count!==U){let _=function(){P.dispose(),i.delete(m),m.removeEventListener("dispose",_)};p!==void 0&&p.texture.dispose();const S=m.morphAttributes.position!==void 0,C=m.morphAttributes.normal!==void 0,G=m.morphAttributes.color!==void 0,d=m.morphAttributes.position||[],l=m.morphAttributes.normal||[],O=m.morphAttributes.color||[];let y=0;S===!0&&(y=1),C===!0&&(y=2),G===!0&&(y=3);let h=m.attributes.position.count*y,A=1;h>n.maxTextureSize&&(A=Math.ceil(h/n.maxTextureSize),h=n.maxTextureSize);const g=new Float32Array(h*A*4*U),P=new Ga(g,h,A,U);P.type=Ht,P.needsUpdate=!0;const c=y*4;for(let I=0;I<U;I++){const R=d[I],F=l[I],j=O[I],Z=h*A*4*I;for(let W=0;W<R.count;W++){const Y=W*c;S===!0&&(s.fromBufferAttribute(R,W),g[Z+Y+0]=s.x,g[Z+Y+1]=s.y,g[Z+Y+2]=s.z,g[Z+Y+3]=0),C===!0&&(s.fromBufferAttribute(F,W),g[Z+Y+4]=s.x,g[Z+Y+5]=s.y,g[Z+Y+6]=s.z,g[Z+Y+7]=0),G===!0&&(s.fromBufferAttribute(j,W),g[Z+Y+8]=s.x,g[Z+Y+9]=s.y,g[Z+Y+10]=s.z,g[Z+Y+11]=j.itemSize===4?s.w:1)}}p={count:U,texture:P,size:new je(h,A)},i.set(m,p),m.addEventListener("dispose",_)}if(f.isInstancedMesh===!0&&f.morphTexture!==null)b.getUniforms().setValue(e,"morphTexture",f.morphTexture,t);else{let S=0;for(let G=0;G<M.length;G++)S+=M[G];const C=m.morphTargetsRelative?1:1-S;b.getUniforms().setValue(e,"morphTargetBaseInfluence",C),b.getUniforms().setValue(e,"morphTargetInfluences",M)}b.getUniforms().setValue(e,"morphTargetsTexture",p.texture,t),b.getUniforms().setValue(e,"morphTargetsTextureSize",p.size)}return{update:r}}function Nc(e,n,t,i,s){let r=new WeakMap;function f(M){const k=s.render.frame,U=M.geometry,p=n.get(M,U);if(r.get(p)!==k&&(n.update(p),r.set(p,k)),M.isInstancedMesh&&(M.hasEventListener("dispose",b)===!1&&M.addEventListener("dispose",b),r.get(M)!==k&&(t.update(M.instanceMatrix,e.ARRAY_BUFFER),M.instanceColor!==null&&t.update(M.instanceColor,e.ARRAY_BUFFER),r.set(M,k))),M.isSkinnedMesh){const S=M.skeleton;r.get(S)!==k&&(S.update(),r.set(S,k))}return p}function m(){r=new WeakMap}function b(M){const k=M.target;k.removeEventListener("dispose",b),i.releaseStatesOfObject(k),t.remove(k.instanceMatrix),k.instanceColor!==null&&t.remove(k.instanceColor)}return{update:f,dispose:m}}const yc={[qa]:"LINEAR_TONE_MAPPING",[Ka]:"REINHARD_TONE_MAPPING",[Ya]:"CINEON_TONE_MAPPING",[Xa]:"ACES_FILMIC_TONE_MAPPING",[za]:"AGX_TONE_MAPPING",[Wa]:"NEUTRAL_TONE_MAPPING",[ka]:"CUSTOM_TONE_MAPPING"};function Oc(e,n,t,i,s,r){const f=new Ut(n,t,{type:e,depthBuffer:s,stencilBuffer:r,samples:i?4:0,depthTexture:s?new pn(n,t):void 0}),m=new Ut(n,t,{type:kt,depthBuffer:!1,stencilBuffer:!1}),b=new Pn;b.setAttribute("position",new _i([-1,3,0,-1,-1,0,3,-1,0],3)),b.setAttribute("uv",new _i([0,2,0,0,2,0],2));const M=new gr({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),k=new yt(b,M),U=new La(-1,1,1,-1,0,1);let p=null,S=null,C=!1,G,d=null,l=[],O=!1;this.setSize=function(y,h){f.setSize(y,h),m.setSize(y,h);for(let A=0;A<l.length;A++){const g=l[A];g.setSize&&g.setSize(y,h)}},this.setEffects=function(y){l=y,O=l.length>0&&l[0].isRenderPass===!0;const h=f.width,A=f.height;for(let g=0;g<l.length;g++){const P=l[g];P.setSize&&P.setSize(h,A)}},this.begin=function(y,h){if(C||y.toneMapping===Dt&&l.length===0)return!1;if(d=h,h!==null){const A=h.width,g=h.height;(f.width!==A||f.height!==g)&&this.setSize(A,g)}return O===!1&&y.setRenderTarget(f),G=y.toneMapping,y.toneMapping=Dt,!0},this.hasRenderPass=function(){return O},this.end=function(y,h){y.toneMapping=G,C=!0;let A=f,g=m;for(let P=0;P<l.length;P++){const c=l[P];if(c.enabled!==!1&&(c.render(y,g,A,h),c.needsSwap!==!1)){const _=A;A=g,g=_}}if(p!==y.outputColorSpace||S!==y.toneMapping){p=y.outputColorSpace,S=y.toneMapping,M.defines={},Je.getTransfer(p)===Ze&&(M.defines.SRGB_TRANSFER="");const P=yc[S];P&&(M.defines[P]=""),M.needsUpdate=!0}M.uniforms.tDiffuse.value=A.texture,y.setRenderTarget(d),y.render(k,U),d=null,C=!1},this.isCompositing=function(){return C},this.dispose=function(){f.depthTexture&&f.depthTexture.dispose(),f.dispose(),m.dispose(),b.dispose(),M.dispose()}}const er=new Lo,Jn=new pn(1,1),tr=new Ga,nr=new Ao,ir=new Va,ca=[],fa=[],da=new Float32Array(16),ua=new Float32Array(9),pa=new Float32Array(4);function on(e,n,t){const i=e[0];if(i<=0||i>0)return e;const s=n*t;let r=ca[s];if(r===void 0&&(r=new Float32Array(s),ca[s]=r),n!==0){i.toArray(r,0);for(let f=1,m=0;f!==n;++f)m+=t,e[f].toArray(r,m)}return r}function dt(e,n){if(e.length!==n.length)return!1;for(let t=0,i=e.length;t<i;t++)if(e[t]!==n[t])return!1;return!0}function ut(e,n){for(let t=0,i=n.length;t<i;t++)e[t]=n[t]}function Un(e,n){let t=fa[n];t===void 0&&(t=new Int32Array(n),fa[n]=t);for(let i=0;i!==n;++i)t[i]=e.allocateTextureUnit();return t}function Fc(e,n){const t=this.cache;t[0]!==n&&(e.uniform1f(this.addr,n),t[0]=n)}function Bc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2f(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(dt(t,n))return;e.uniform2fv(this.addr,n),ut(t,n)}}function Gc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3f(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else if(n.r!==void 0)(t[0]!==n.r||t[1]!==n.g||t[2]!==n.b)&&(e.uniform3f(this.addr,n.r,n.g,n.b),t[0]=n.r,t[1]=n.g,t[2]=n.b);else{if(dt(t,n))return;e.uniform3fv(this.addr,n),ut(t,n)}}function Hc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4f(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(dt(t,n))return;e.uniform4fv(this.addr,n),ut(t,n)}}function Vc(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(dt(t,n))return;e.uniformMatrix2fv(this.addr,!1,n),ut(t,n)}else{if(dt(t,i))return;pa.set(i),e.uniformMatrix2fv(this.addr,!1,pa),ut(t,i)}}function kc(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(dt(t,n))return;e.uniformMatrix3fv(this.addr,!1,n),ut(t,n)}else{if(dt(t,i))return;ua.set(i),e.uniformMatrix3fv(this.addr,!1,ua),ut(t,i)}}function Wc(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(dt(t,n))return;e.uniformMatrix4fv(this.addr,!1,n),ut(t,n)}else{if(dt(t,i))return;da.set(i),e.uniformMatrix4fv(this.addr,!1,da),ut(t,i)}}function zc(e,n){const t=this.cache;t[0]!==n&&(e.uniform1i(this.addr,n),t[0]=n)}function Xc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2i(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(dt(t,n))return;e.uniform2iv(this.addr,n),ut(t,n)}}function Yc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3i(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(dt(t,n))return;e.uniform3iv(this.addr,n),ut(t,n)}}function Kc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4i(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(dt(t,n))return;e.uniform4iv(this.addr,n),ut(t,n)}}function qc(e,n){const t=this.cache;t[0]!==n&&(e.uniform1ui(this.addr,n),t[0]=n)}function Zc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2ui(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(dt(t,n))return;e.uniform2uiv(this.addr,n),ut(t,n)}}function $c(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3ui(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(dt(t,n))return;e.uniform3uiv(this.addr,n),ut(t,n)}}function jc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4ui(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(dt(t,n))return;e.uniform4uiv(this.addr,n),ut(t,n)}}function Qc(e,n,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s);let r;this.type===e.SAMPLER_2D_SHADOW?(Jn.compareFunction=t.isReversedDepthBuffer()?ti:ni,r=Jn):r=er,t.setTexture2D(n||r,s)}function Jc(e,n,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(n||nr,s)}function ef(e,n,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(n||ir,s)}function tf(e,n,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(n||tr,s)}function nf(e){switch(e){case 5126:return Fc;case 35664:return Bc;case 35665:return Gc;case 35666:return Hc;case 35674:return Vc;case 35675:return kc;case 35676:return Wc;case 5124:case 35670:return zc;case 35667:case 35671:return Xc;case 35668:case 35672:return Yc;case 35669:case 35673:return Kc;case 5125:return qc;case 36294:return Zc;case 36295:return $c;case 36296:return jc;case 35678:case 36198:case 36298:case 36306:case 35682:return Qc;case 35679:case 36299:case 36307:return Jc;case 35680:case 36300:case 36308:case 36293:return ef;case 36289:case 36303:case 36311:case 36292:return tf}}function af(e,n){e.uniform1fv(this.addr,n)}function rf(e,n){const t=on(n,this.size,2);e.uniform2fv(this.addr,t)}function of(e,n){const t=on(n,this.size,3);e.uniform3fv(this.addr,t)}function sf(e,n){const t=on(n,this.size,4);e.uniform4fv(this.addr,t)}function lf(e,n){const t=on(n,this.size,4);e.uniformMatrix2fv(this.addr,!1,t)}function cf(e,n){const t=on(n,this.size,9);e.uniformMatrix3fv(this.addr,!1,t)}function ff(e,n){const t=on(n,this.size,16);e.uniformMatrix4fv(this.addr,!1,t)}function df(e,n){e.uniform1iv(this.addr,n)}function uf(e,n){e.uniform2iv(this.addr,n)}function pf(e,n){e.uniform3iv(this.addr,n)}function hf(e,n){e.uniform4iv(this.addr,n)}function mf(e,n){e.uniform1uiv(this.addr,n)}function _f(e,n){e.uniform2uiv(this.addr,n)}function gf(e,n){e.uniform3uiv(this.addr,n)}function vf(e,n){e.uniform4uiv(this.addr,n)}function Sf(e,n,t){const i=this.cache,s=n.length,r=Un(t,s);dt(i,r)||(e.uniform1iv(this.addr,r),ut(i,r));let f;this.type===e.SAMPLER_2D_SHADOW?f=Jn:f=er;for(let m=0;m!==s;++m)t.setTexture2D(n[m]||f,r[m])}function Ef(e,n,t){const i=this.cache,s=n.length,r=Un(t,s);dt(i,r)||(e.uniform1iv(this.addr,r),ut(i,r));for(let f=0;f!==s;++f)t.setTexture3D(n[f]||nr,r[f])}function xf(e,n,t){const i=this.cache,s=n.length,r=Un(t,s);dt(i,r)||(e.uniform1iv(this.addr,r),ut(i,r));for(let f=0;f!==s;++f)t.setTextureCube(n[f]||ir,r[f])}function Mf(e,n,t){const i=this.cache,s=n.length,r=Un(t,s);dt(i,r)||(e.uniform1iv(this.addr,r),ut(i,r));for(let f=0;f!==s;++f)t.setTexture2DArray(n[f]||tr,r[f])}function Tf(e){switch(e){case 5126:return af;case 35664:return rf;case 35665:return of;case 35666:return sf;case 35674:return lf;case 35675:return cf;case 35676:return ff;case 5124:case 35670:return df;case 35667:case 35671:return uf;case 35668:case 35672:return pf;case 35669:case 35673:return hf;case 5125:return mf;case 36294:return _f;case 36295:return gf;case 36296:return vf;case 35678:case 36198:case 36298:case 36306:case 35682:return Sf;case 35679:case 36299:case 36307:return Ef;case 35680:case 36300:case 36308:case 36293:return xf;case 36289:case 36303:case 36311:case 36292:return Mf}}class Af{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.setValue=nf(t.type)}}class bf{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Tf(t.type)}}class Rf{constructor(n){this.id=n,this.seq=[],this.map={}}setValue(n,t,i){const s=this.seq;for(let r=0,f=s.length;r!==f;++r){const m=s[r];m.setValue(n,t[m.id],i)}}}const Yn=/(\w+)(\])?(\[|\.)?/g;function ha(e,n){e.seq.push(n),e.map[n.id]=n}function Cf(e,n,t){const i=e.name,s=i.length;for(Yn.lastIndex=0;;){const r=Yn.exec(i),f=Yn.lastIndex;let m=r[1];const b=r[2]==="]",M=r[3];if(b&&(m=m|0),M===void 0||M==="["&&f+2===s){ha(t,M===void 0?new Af(m,e,n):new bf(m,e,n));break}else{let U=t.map[m];U===void 0&&(U=new Rf(m),ha(t,U)),t=U}}}class Rn{constructor(n,t){this.seq=[],this.map={};const i=n.getProgramParameter(t,n.ACTIVE_UNIFORMS);for(let f=0;f<i;++f){const m=n.getActiveUniform(t,f),b=n.getUniformLocation(t,m.name);Cf(m,b,this)}const s=[],r=[];for(const f of this.seq)f.type===n.SAMPLER_2D_SHADOW||f.type===n.SAMPLER_CUBE_SHADOW||f.type===n.SAMPLER_2D_ARRAY_SHADOW?s.push(f):r.push(f);s.length>0&&(this.seq=s.concat(r))}setValue(n,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(n,i,s)}setOptional(n,t,i){const s=t[i];s!==void 0&&this.setValue(n,i,s)}static upload(n,t,i,s){for(let r=0,f=t.length;r!==f;++r){const m=t[r],b=i[m.id];b.needsUpdate!==!1&&m.setValue(n,b.value,s)}}static seqWithValue(n,t){const i=[];for(let s=0,r=n.length;s!==r;++s){const f=n[s];f.id in t&&i.push(f)}return i}}function ma(e,n,t){const i=e.createShader(n);return e.shaderSource(i,t),e.compileShader(i),i}const Pf=37297;let Lf=0;function Df(e,n){const t=e.split(`
`),i=[],s=Math.max(n-6,0),r=Math.min(n+6,t.length);for(let f=s;f<r;f++){const m=f+1;i.push(`${m===n?">":" "} ${m}: ${t[f]}`)}return i.join(`
`)}const _a=new Ne;function Uf(e){Je._getMatrix(_a,Je.workingColorSpace,e);const n=`mat3( ${_a.elements.map(t=>t.toFixed(4))} )`;switch(Je.getTransfer(e)){case Za:return[n,"LinearTransferOETF"];case Ze:return[n,"sRGBTransferOETF"];default:return Be("WebGLProgram: Unsupported color space: ",e),[n,"LinearTransferOETF"]}}function ga(e,n,t){const i=e.getShaderParameter(n,e.COMPILE_STATUS),r=(e.getShaderInfoLog(n)||"").trim();if(i&&r==="")return"";const f=/ERROR: 0:(\d+)/.exec(r);if(f){const m=parseInt(f[1]);return t.toUpperCase()+`

`+r+`

`+Df(e.getShaderSource(n),m)}else return r}function wf(e,n){const t=Uf(n);return[`vec4 ${e}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const If={[qa]:"Linear",[Ka]:"Reinhard",[Ya]:"Cineon",[Xa]:"ACESFilmic",[za]:"AgX",[Wa]:"Neutral",[ka]:"Custom"};function Nf(e,n){const t=If[n];return t===void 0?(Be("WebGLProgram: Unsupported toneMapping:",n),"vec3 "+e+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+e+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const En=new Ce;function yf(){Je.getLuminanceCoefficients(En);const e=En.x.toFixed(4),n=En.y.toFixed(4),t=En.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${n}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Of(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(dn).join(`
`)}function Ff(e){const n=[];for(const t in e){const i=e[t];i!==!1&&n.push("#define "+t+" "+i)}return n.join(`
`)}function Bf(e,n){const t={},i=e.getProgramParameter(n,e.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=e.getActiveAttrib(n,s),f=r.name;let m=1;r.type===e.FLOAT_MAT2&&(m=2),r.type===e.FLOAT_MAT3&&(m=3),r.type===e.FLOAT_MAT4&&(m=4),t[f]={type:r.type,location:e.getAttribLocation(n,f),locationSize:m}}return t}function dn(e){return e!==""}function va(e,n){const t=n.numSpotLightShadows+n.numSpotLightMaps-n.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,n.numDirLights).replace(/NUM_SPOT_LIGHTS/g,n.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,n.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,n.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,n.numPointLights).replace(/NUM_HEMI_LIGHTS/g,n.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,n.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,n.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,n.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,n.numPointLightShadows)}function Sa(e,n){return e.replace(/NUM_CLIPPING_PLANES/g,n.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,n.numClippingPlanes-n.numClipIntersection)}const Gf=/^[ \t]*#include +<([\w\d./]+)>/gm;function ei(e){return e.replace(Gf,Vf)}const Hf=new Map;function Vf(e,n){let t=Ue[n];if(t===void 0){const i=Hf.get(n);if(i!==void 0)t=Ue[i],Be('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',n,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+n+">")}return ei(t)}const kf=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ea(e){return e.replace(kf,Wf)}function Wf(e,n,t,i){let s="";for(let r=parseInt(n);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function xa(e){let n=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision==="highp"?n+=`
#define HIGH_PRECISION`:e.precision==="mediump"?n+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(n+=`
#define LOW_PRECISION`),n}const zf={[An]:"SHADOWMAP_TYPE_PCF",[fn]:"SHADOWMAP_TYPE_VSM"};function Xf(e){return zf[e.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Yf={[mn]:"ENVMAP_TYPE_CUBE",[rn]:"ENVMAP_TYPE_CUBE",[Ln]:"ENVMAP_TYPE_CUBE_UV"};function Kf(e){return e.envMap===!1?"ENVMAP_TYPE_CUBE":Yf[e.envMapMode]||"ENVMAP_TYPE_CUBE"}const qf={[rn]:"ENVMAP_MODE_REFRACTION"};function Zf(e){return e.envMap===!1?"ENVMAP_MODE_REFLECTION":qf[e.envMapMode]||"ENVMAP_MODE_REFLECTION"}const $f={[Po]:"ENVMAP_BLENDING_MULTIPLY",[Co]:"ENVMAP_BLENDING_MIX",[Ro]:"ENVMAP_BLENDING_ADD"};function jf(e){return e.envMap===!1?"ENVMAP_BLENDING_NONE":$f[e.combine]||"ENVMAP_BLENDING_NONE"}function Qf(e){const n=e.envMapCubeUVHeight;if(n===null)return null;const t=Math.log2(n)-2,i=1/n;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function Jf(e,n,t,i){const s=e.getContext(),r=t.defines;let f=t.vertexShader,m=t.fragmentShader;const b=Xf(t),M=Kf(t),k=Zf(t),U=jf(t),p=Qf(t),S=Of(t),C=Ff(r),G=s.createProgram();let d,l,O=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,C].filter(dn).join(`
`),d.length>0&&(d+=`
`),l=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,C].filter(dn).join(`
`),l.length>0&&(l+=`
`)):(d=[xa(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,C,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+k:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+b:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(dn).join(`
`),l=[xa(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,C,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+M:"",t.envMap?"#define "+k:"",t.envMap?"#define "+U:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+b:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Dt?"#define TONE_MAPPING":"",t.toneMapping!==Dt?Ue.tonemapping_pars_fragment:"",t.toneMapping!==Dt?Nf("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ue.colorspace_pars_fragment,wf("linearToOutputTexel",t.outputColorSpace),yf(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(dn).join(`
`)),f=ei(f),f=va(f,t),f=Sa(f,t),m=ei(m),m=va(m,t),m=Sa(m,t),f=Ea(f),m=Ea(m),t.isRawShaderMaterial!==!0&&(O=`#version 300 es
`,d=[S,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,l=["#define varying in",t.glslVersion===ea?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ea?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+l);const y=O+d+f,h=O+l+m,A=ma(s,s.VERTEX_SHADER,y),g=ma(s,s.FRAGMENT_SHADER,h);s.attachShader(G,A),s.attachShader(G,g),t.index0AttributeName!==void 0?s.bindAttribLocation(G,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(G,0,"position"),s.linkProgram(G);function P(R){if(e.debug.checkShaderErrors){const F=s.getProgramInfoLog(G)||"",j=s.getShaderInfoLog(A)||"",Z=s.getShaderInfoLog(g)||"",W=F.trim(),Y=j.trim(),V=Z.trim();let $=!0,ce=!0;if(s.getProgramParameter(G,s.LINK_STATUS)===!1)if($=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(s,G,A,g);else{const ge=ga(s,A,"vertex"),ve=ga(s,g,"fragment");$e("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(G,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+W+`
`+ge+`
`+ve)}else W!==""?Be("WebGLProgram: Program Info Log:",W):(Y===""||V==="")&&(ce=!1);ce&&(R.diagnostics={runnable:$,programLog:W,vertexShader:{log:Y,prefix:d},fragmentShader:{log:V,prefix:l}})}s.deleteShader(A),s.deleteShader(g),c=new Rn(s,G),_=Bf(s,G)}let c;this.getUniforms=function(){return c===void 0&&P(this),c};let _;this.getAttributes=function(){return _===void 0&&P(this),_};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(G,Pf)),I},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(G),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Lf++,this.cacheKey=n,this.usedTimes=1,this.program=G,this.vertexShader=A,this.fragmentShader=g,this}let ed=0;class td{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(n,t,i){const s=this._getShaderCacheForMaterial(n);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(n){const t=this.materialCache.get(n);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(n),this}getVertexShaderStage(n){return this._getShaderStage(n.vertexShader)}getFragmentShaderStage(n){return this._getShaderStage(n.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(n){const t=this.materialCache;let i=t.get(n);return i===void 0&&(i=new Set,t.set(n,i)),i}_getShaderStage(n){const t=this.shaderCache;let i=t.get(n);return i===void 0&&(i=new nd(n),t.set(n,i)),i}}class nd{constructor(n){this.id=ed++,this.code=n,this.usedTimes=0}}function id(e){return e===an||e===$n||e===jn}function ad(e,n,t,i,s,r){const f=new Mo,m=new td,b=new Set,M=[],k=new Map,U=i.logarithmicDepthBuffer;let p=i.precision;const S={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function C(c){return b.add(c),c===0?"uv":`uv${c}`}function G(c,_,I,R,F,j){const Z=R.fog,W=F.geometry,Y=c.isMeshStandardMaterial||c.isMeshLambertMaterial||c.isMeshPhongMaterial?R.environment:null,V=c.isMeshStandardMaterial||c.isMeshLambertMaterial&&!c.envMap||c.isMeshPhongMaterial&&!c.envMap,$=n.get(c.envMap||Y,V),ce=$&&$.mapping===Ln?$.image.height:null,ge=S[c.type];c.precision!==null&&(p=i.getMaxPrecision(c.precision),p!==c.precision&&Be("WebGLProgram.getParameters:",c.precision,"not supported, using",p,"instead."));const ve=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,xe=ve!==void 0?ve.length:0;let Ye=0;W.morphAttributes.position!==void 0&&(Ye=1),W.morphAttributes.normal!==void 0&&(Ye=2),W.morphAttributes.color!==void 0&&(Ye=3);let ot,He,K,te;if(ge){const he=Pt[ge];ot=he.vertexShader,He=he.fragmentShader}else{ot=c.vertexShader,He=c.fragmentShader;const he=m.getVertexShaderStage(c),tt=m.getFragmentShaderStage(c);m.update(c,he,tt),K=he.id,te=tt.id}const Q=e.getRenderTarget(),Re=e.state.buffers.depth.getReversed(),Pe=F.isInstancedMesh===!0,Ae=F.isBatchedMesh===!0,it=!!c.map,Ie=!!c.matcap,We=!!$,Fe=!!c.aoMap,ye=!!c.lightMap,st=!!c.bumpMap&&c.wireframe===!1,ct=!!c.normalMap,pt=!!c.displacementMap,ht=!!c.emissiveMap,et=!!c.metalnessMap,lt=!!c.roughnessMap,E=c.anisotropy>0,_t=c.clearcoat>0,Ge=c.dispersion>0,u=c.iridescence>0,a=c.sheen>0,T=c.transmission>0,w=E&&!!c.anisotropyMap,B=_t&&!!c.clearcoatMap,J=_t&&!!c.clearcoatNormalMap,ne=_t&&!!c.clearcoatRoughnessMap,H=u&&!!c.iridescenceMap,X=u&&!!c.iridescenceThicknessMap,ie=a&&!!c.sheenColorMap,Se=a&&!!c.sheenRoughnessMap,oe=!!c.specularMap,ae=!!c.specularColorMap,Te=!!c.specularIntensityMap,be=T&&!!c.transmissionMap,Le=T&&!!c.thicknessMap,v=!!c.gradientMap,ee=!!c.alphaMap,z=c.alphaTest>0,re=!!c.alphaHash,de=!!c.extensions;let q=Dt;c.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(q=e.toneMapping);const _e={shaderID:ge,shaderType:c.type,shaderName:c.name,vertexShader:ot,fragmentShader:He,defines:c.defines,customVertexShaderID:K,customFragmentShaderID:te,isRawShaderMaterial:c.isRawShaderMaterial===!0,glslVersion:c.glslVersion,precision:p,batching:Ae,batchingColor:Ae&&F._colorsTexture!==null,instancing:Pe,instancingColor:Pe&&F.instanceColor!==null,instancingMorph:Pe&&F.morphTexture!==null,outputColorSpace:Q===null?e.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:Je.workingColorSpace,alphaToCoverage:!!c.alphaToCoverage,map:it,matcap:Ie,envMap:We,envMapMode:We&&$.mapping,envMapCubeUVHeight:ce,aoMap:Fe,lightMap:ye,bumpMap:st,normalMap:ct,displacementMap:pt,emissiveMap:ht,normalMapObjectSpace:ct&&c.normalMapType===vo,normalMapTangentSpace:ct&&c.normalMapType===Qi,packedNormalMap:ct&&c.normalMapType===Qi&&id(c.normalMap.format),metalnessMap:et,roughnessMap:lt,anisotropy:E,anisotropyMap:w,clearcoat:_t,clearcoatMap:B,clearcoatNormalMap:J,clearcoatRoughnessMap:ne,dispersion:Ge,iridescence:u,iridescenceMap:H,iridescenceThicknessMap:X,sheen:a,sheenColorMap:ie,sheenRoughnessMap:Se,specularMap:oe,specularColorMap:ae,specularIntensityMap:Te,transmission:T,transmissionMap:be,thicknessMap:Le,gradientMap:v,opaque:c.transparent===!1&&c.blending===bn&&c.alphaToCoverage===!1,alphaMap:ee,alphaTest:z,alphaHash:re,combine:c.combine,mapUv:it&&C(c.map.channel),aoMapUv:Fe&&C(c.aoMap.channel),lightMapUv:ye&&C(c.lightMap.channel),bumpMapUv:st&&C(c.bumpMap.channel),normalMapUv:ct&&C(c.normalMap.channel),displacementMapUv:pt&&C(c.displacementMap.channel),emissiveMapUv:ht&&C(c.emissiveMap.channel),metalnessMapUv:et&&C(c.metalnessMap.channel),roughnessMapUv:lt&&C(c.roughnessMap.channel),anisotropyMapUv:w&&C(c.anisotropyMap.channel),clearcoatMapUv:B&&C(c.clearcoatMap.channel),clearcoatNormalMapUv:J&&C(c.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ne&&C(c.clearcoatRoughnessMap.channel),iridescenceMapUv:H&&C(c.iridescenceMap.channel),iridescenceThicknessMapUv:X&&C(c.iridescenceThicknessMap.channel),sheenColorMapUv:ie&&C(c.sheenColorMap.channel),sheenRoughnessMapUv:Se&&C(c.sheenRoughnessMap.channel),specularMapUv:oe&&C(c.specularMap.channel),specularColorMapUv:ae&&C(c.specularColorMap.channel),specularIntensityMapUv:Te&&C(c.specularIntensityMap.channel),transmissionMapUv:be&&C(c.transmissionMap.channel),thicknessMapUv:Le&&C(c.thicknessMap.channel),alphaMapUv:ee&&C(c.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(ct||E),vertexNormals:!!W.attributes.normal,vertexColors:c.vertexColors,vertexAlphas:c.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!W.attributes.uv&&(it||ee),fog:!!Z,useFog:c.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:c.wireframe===!1&&(c.flatShading===!0||W.attributes.normal===void 0&&ct===!1&&(c.isMeshLambertMaterial||c.isMeshPhongMaterial||c.isMeshStandardMaterial||c.isMeshPhysicalMaterial)),sizeAttenuation:c.sizeAttenuation===!0,logarithmicDepthBuffer:U,reversedDepthBuffer:Re,skinning:F.isSkinnedMesh===!0,hasPositionAttribute:W.attributes.position!==void 0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:xe,morphTextureStride:Ye,numDirLights:_.directional.length,numPointLights:_.point.length,numSpotLights:_.spot.length,numSpotLightMaps:_.spotLightMap.length,numRectAreaLights:_.rectArea.length,numHemiLights:_.hemi.length,numDirLightShadows:_.directionalShadowMap.length,numPointLightShadows:_.pointShadowMap.length,numSpotLightShadows:_.spotShadowMap.length,numSpotLightShadowsWithMaps:_.numSpotLightShadowsWithMaps,numLightProbes:_.numLightProbes,numLightProbeGrids:j.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:c.dithering,shadowMapEnabled:e.shadowMap.enabled&&I.length>0,shadowMapType:e.shadowMap.type,toneMapping:q,decodeVideoTexture:it&&c.map.isVideoTexture===!0&&Je.getTransfer(c.map.colorSpace)===Ze,decodeVideoTextureEmissive:ht&&c.emissiveMap.isVideoTexture===!0&&Je.getTransfer(c.emissiveMap.colorSpace)===Ze,premultipliedAlpha:c.premultipliedAlpha,doubleSided:c.side===wt,flipSided:c.side===Mt,useDepthPacking:c.depthPacking>=0,depthPacking:c.depthPacking||0,index0AttributeName:c.index0AttributeName,extensionClipCullDistance:de&&c.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(de&&c.extensions.multiDraw===!0||Ae)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:c.customProgramCacheKey()};return _e.vertexUv1s=b.has(1),_e.vertexUv2s=b.has(2),_e.vertexUv3s=b.has(3),b.clear(),_e}function d(c){const _=[];if(c.shaderID?_.push(c.shaderID):(_.push(c.customVertexShaderID),_.push(c.customFragmentShaderID)),c.defines!==void 0)for(const I in c.defines)_.push(I),_.push(c.defines[I]);return c.isRawShaderMaterial===!1&&(l(_,c),O(_,c),_.push(e.outputColorSpace)),_.push(c.customProgramCacheKey),_.join()}function l(c,_){c.push(_.precision),c.push(_.outputColorSpace),c.push(_.envMapMode),c.push(_.envMapCubeUVHeight),c.push(_.mapUv),c.push(_.alphaMapUv),c.push(_.lightMapUv),c.push(_.aoMapUv),c.push(_.bumpMapUv),c.push(_.normalMapUv),c.push(_.displacementMapUv),c.push(_.emissiveMapUv),c.push(_.metalnessMapUv),c.push(_.roughnessMapUv),c.push(_.anisotropyMapUv),c.push(_.clearcoatMapUv),c.push(_.clearcoatNormalMapUv),c.push(_.clearcoatRoughnessMapUv),c.push(_.iridescenceMapUv),c.push(_.iridescenceThicknessMapUv),c.push(_.sheenColorMapUv),c.push(_.sheenRoughnessMapUv),c.push(_.specularMapUv),c.push(_.specularColorMapUv),c.push(_.specularIntensityMapUv),c.push(_.transmissionMapUv),c.push(_.thicknessMapUv),c.push(_.combine),c.push(_.fogExp2),c.push(_.sizeAttenuation),c.push(_.morphTargetsCount),c.push(_.morphAttributeCount),c.push(_.numDirLights),c.push(_.numPointLights),c.push(_.numSpotLights),c.push(_.numSpotLightMaps),c.push(_.numHemiLights),c.push(_.numRectAreaLights),c.push(_.numDirLightShadows),c.push(_.numPointLightShadows),c.push(_.numSpotLightShadows),c.push(_.numSpotLightShadowsWithMaps),c.push(_.numLightProbes),c.push(_.shadowMapType),c.push(_.toneMapping),c.push(_.numClippingPlanes),c.push(_.numClipIntersection),c.push(_.depthPacking)}function O(c,_){f.disableAll(),_.instancing&&f.enable(0),_.instancingColor&&f.enable(1),_.instancingMorph&&f.enable(2),_.matcap&&f.enable(3),_.envMap&&f.enable(4),_.normalMapObjectSpace&&f.enable(5),_.normalMapTangentSpace&&f.enable(6),_.clearcoat&&f.enable(7),_.iridescence&&f.enable(8),_.alphaTest&&f.enable(9),_.vertexColors&&f.enable(10),_.vertexAlphas&&f.enable(11),_.vertexUv1s&&f.enable(12),_.vertexUv2s&&f.enable(13),_.vertexUv3s&&f.enable(14),_.vertexTangents&&f.enable(15),_.anisotropy&&f.enable(16),_.alphaHash&&f.enable(17),_.batching&&f.enable(18),_.dispersion&&f.enable(19),_.batchingColor&&f.enable(20),_.gradientMap&&f.enable(21),_.packedNormalMap&&f.enable(22),_.vertexNormals&&f.enable(23),c.push(f.mask),f.disableAll(),_.fog&&f.enable(0),_.useFog&&f.enable(1),_.flatShading&&f.enable(2),_.logarithmicDepthBuffer&&f.enable(3),_.reversedDepthBuffer&&f.enable(4),_.skinning&&f.enable(5),_.morphTargets&&f.enable(6),_.morphNormals&&f.enable(7),_.morphColors&&f.enable(8),_.premultipliedAlpha&&f.enable(9),_.shadowMapEnabled&&f.enable(10),_.doubleSided&&f.enable(11),_.flipSided&&f.enable(12),_.useDepthPacking&&f.enable(13),_.dithering&&f.enable(14),_.transmission&&f.enable(15),_.sheen&&f.enable(16),_.opaque&&f.enable(17),_.pointsUvs&&f.enable(18),_.decodeVideoTexture&&f.enable(19),_.decodeVideoTextureEmissive&&f.enable(20),_.alphaToCoverage&&f.enable(21),_.numLightProbeGrids>0&&f.enable(22),_.hasPositionAttribute&&f.enable(23),c.push(f.mask)}function y(c){const _=S[c.type];let I;if(_){const R=Pt[_];I=go.clone(R.uniforms)}else I=c.uniforms;return I}function h(c,_){let I=k.get(_);return I!==void 0?++I.usedTimes:(I=new Jf(e,_,c,s),M.push(I),k.set(_,I)),I}function A(c){if(--c.usedTimes===0){const _=M.indexOf(c);M[_]=M[M.length-1],M.pop(),k.delete(c.cacheKey),c.destroy()}}function g(c){m.remove(c)}function P(){m.dispose()}return{getParameters:G,getProgramCacheKey:d,getUniforms:y,acquireProgram:h,releaseProgram:A,releaseShaderCache:g,programs:M,dispose:P}}function rd(){let e=new WeakMap;function n(f){return e.has(f)}function t(f){let m=e.get(f);return m===void 0&&(m={},e.set(f,m)),m}function i(f){e.delete(f)}function s(f,m,b){e.get(f)[m]=b}function r(){e=new WeakMap}return{has:n,get:t,remove:i,update:s,dispose:r}}function od(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.material.id!==n.material.id?e.material.id-n.material.id:e.materialVariant!==n.materialVariant?e.materialVariant-n.materialVariant:e.z!==n.z?e.z-n.z:e.id-n.id}function Ma(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.z!==n.z?n.z-e.z:e.id-n.id}function Ta(){const e=[];let n=0;const t=[],i=[],s=[];function r(){n=0,t.length=0,i.length=0,s.length=0}function f(p){let S=0;return p.isInstancedMesh&&(S+=2),p.isSkinnedMesh&&(S+=1),S}function m(p,S,C,G,d,l){let O=e[n];return O===void 0?(O={id:p.id,object:p,geometry:S,material:C,materialVariant:f(p),groupOrder:G,renderOrder:p.renderOrder,z:d,group:l},e[n]=O):(O.id=p.id,O.object=p,O.geometry=S,O.material=C,O.materialVariant=f(p),O.groupOrder=G,O.renderOrder=p.renderOrder,O.z=d,O.group=l),n++,O}function b(p,S,C,G,d,l){const O=m(p,S,C,G,d,l);C.transmission>0?i.push(O):C.transparent===!0?s.push(O):t.push(O)}function M(p,S,C,G,d,l){const O=m(p,S,C,G,d,l);C.transmission>0?i.unshift(O):C.transparent===!0?s.unshift(O):t.unshift(O)}function k(p,S,C){t.length>1&&t.sort(p||od),i.length>1&&i.sort(S||Ma),s.length>1&&s.sort(S||Ma),C&&(t.reverse(),i.reverse(),s.reverse())}function U(){for(let p=n,S=e.length;p<S;p++){const C=e[p];if(C.id===null)break;C.id=null,C.object=null,C.geometry=null,C.material=null,C.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:b,unshift:M,finish:U,sort:k}}function sd(){let e=new WeakMap;function n(i,s){const r=e.get(i);let f;return r===void 0?(f=new Ta,e.set(i,[f])):s>=r.length?(f=new Ta,r.push(f)):f=r[s],f}function t(){e=new WeakMap}return{get:n,dispose:t}}function ld(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={direction:new Ce,color:new Qe};break;case"SpotLight":t={position:new Ce,direction:new Ce,color:new Qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new Ce,color:new Qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new Ce,skyColor:new Qe,groundColor:new Qe};break;case"RectAreaLight":t={color:new Qe,position:new Ce,halfWidth:new Ce,halfHeight:new Ce};break}return e[n.id]=t,t}}}function cd(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new je};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new je};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new je,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[n.id]=t,t}}}let fd=0;function dd(e,n){return(n.castShadow?2:0)-(e.castShadow?2:0)+(n.map?1:0)-(e.map?1:0)}function ud(e){const n=new ld,t=cd(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let M=0;M<9;M++)i.probe.push(new Ce);const s=new Ce,r=new tn,f=new tn;function m(M){let k=0,U=0,p=0;for(let _=0;_<9;_++)i.probe[_].set(0,0,0);let S=0,C=0,G=0,d=0,l=0,O=0,y=0,h=0,A=0,g=0,P=0;M.sort(dd);for(let _=0,I=M.length;_<I;_++){const R=M[_],F=R.color,j=R.intensity,Z=R.distance;let W=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===an?W=R.shadow.map.texture:W=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)k+=F.r*j,U+=F.g*j,p+=F.b*j;else if(R.isLightProbe){for(let Y=0;Y<9;Y++)i.probe[Y].addScaledVector(R.sh.coefficients[Y],j);P++}else if(R.isDirectionalLight){const Y=n.get(R);if(Y.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const V=R.shadow,$=t.get(R);$.shadowIntensity=V.intensity,$.shadowBias=V.bias,$.shadowNormalBias=V.normalBias,$.shadowRadius=V.radius,$.shadowMapSize=V.mapSize,i.directionalShadow[S]=$,i.directionalShadowMap[S]=W,i.directionalShadowMatrix[S]=R.shadow.matrix,O++}i.directional[S]=Y,S++}else if(R.isSpotLight){const Y=n.get(R);Y.position.setFromMatrixPosition(R.matrixWorld),Y.color.copy(F).multiplyScalar(j),Y.distance=Z,Y.coneCos=Math.cos(R.angle),Y.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),Y.decay=R.decay,i.spot[G]=Y;const V=R.shadow;if(R.map&&(i.spotLightMap[A]=R.map,A++,V.updateMatrices(R),R.castShadow&&g++),i.spotLightMatrix[G]=V.matrix,R.castShadow){const $=t.get(R);$.shadowIntensity=V.intensity,$.shadowBias=V.bias,$.shadowNormalBias=V.normalBias,$.shadowRadius=V.radius,$.shadowMapSize=V.mapSize,i.spotShadow[G]=$,i.spotShadowMap[G]=W,h++}G++}else if(R.isRectAreaLight){const Y=n.get(R);Y.color.copy(F).multiplyScalar(j),Y.halfWidth.set(R.width*.5,0,0),Y.halfHeight.set(0,R.height*.5,0),i.rectArea[d]=Y,d++}else if(R.isPointLight){const Y=n.get(R);if(Y.color.copy(R.color).multiplyScalar(R.intensity),Y.distance=R.distance,Y.decay=R.decay,R.castShadow){const V=R.shadow,$=t.get(R);$.shadowIntensity=V.intensity,$.shadowBias=V.bias,$.shadowNormalBias=V.normalBias,$.shadowRadius=V.radius,$.shadowMapSize=V.mapSize,$.shadowCameraNear=V.camera.near,$.shadowCameraFar=V.camera.far,i.pointShadow[C]=$,i.pointShadowMap[C]=W,i.pointShadowMatrix[C]=R.shadow.matrix,y++}i.point[C]=Y,C++}else if(R.isHemisphereLight){const Y=n.get(R);Y.skyColor.copy(R.color).multiplyScalar(j),Y.groundColor.copy(R.groundColor).multiplyScalar(j),i.hemi[l]=Y,l++}}d>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=se.LTC_FLOAT_1,i.rectAreaLTC2=se.LTC_FLOAT_2):(i.rectAreaLTC1=se.LTC_HALF_1,i.rectAreaLTC2=se.LTC_HALF_2)),i.ambient[0]=k,i.ambient[1]=U,i.ambient[2]=p;const c=i.hash;(c.directionalLength!==S||c.pointLength!==C||c.spotLength!==G||c.rectAreaLength!==d||c.hemiLength!==l||c.numDirectionalShadows!==O||c.numPointShadows!==y||c.numSpotShadows!==h||c.numSpotMaps!==A||c.numLightProbes!==P)&&(i.directional.length=S,i.spot.length=G,i.rectArea.length=d,i.point.length=C,i.hemi.length=l,i.directionalShadow.length=O,i.directionalShadowMap.length=O,i.pointShadow.length=y,i.pointShadowMap.length=y,i.spotShadow.length=h,i.spotShadowMap.length=h,i.directionalShadowMatrix.length=O,i.pointShadowMatrix.length=y,i.spotLightMatrix.length=h+A-g,i.spotLightMap.length=A,i.numSpotLightShadowsWithMaps=g,i.numLightProbes=P,c.directionalLength=S,c.pointLength=C,c.spotLength=G,c.rectAreaLength=d,c.hemiLength=l,c.numDirectionalShadows=O,c.numPointShadows=y,c.numSpotShadows=h,c.numSpotMaps=A,c.numLightProbes=P,i.version=fd++)}function b(M,k){let U=0,p=0,S=0,C=0,G=0;const d=k.matrixWorldInverse;for(let l=0,O=M.length;l<O;l++){const y=M[l];if(y.isDirectionalLight){const h=i.directional[U];h.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),h.direction.sub(s),h.direction.transformDirection(d),U++}else if(y.isSpotLight){const h=i.spot[S];h.position.setFromMatrixPosition(y.matrixWorld),h.position.applyMatrix4(d),h.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),h.direction.sub(s),h.direction.transformDirection(d),S++}else if(y.isRectAreaLight){const h=i.rectArea[C];h.position.setFromMatrixPosition(y.matrixWorld),h.position.applyMatrix4(d),f.identity(),r.copy(y.matrixWorld),r.premultiply(d),f.extractRotation(r),h.halfWidth.set(y.width*.5,0,0),h.halfHeight.set(0,y.height*.5,0),h.halfWidth.applyMatrix4(f),h.halfHeight.applyMatrix4(f),C++}else if(y.isPointLight){const h=i.point[p];h.position.setFromMatrixPosition(y.matrixWorld),h.position.applyMatrix4(d),p++}else if(y.isHemisphereLight){const h=i.hemi[G];h.direction.setFromMatrixPosition(y.matrixWorld),h.direction.transformDirection(d),G++}}}return{setup:m,setupView:b,state:i}}function Aa(e){const n=new ud(e),t=[],i=[],s=[];function r(p){U.camera=p,t.length=0,i.length=0,s.length=0}function f(p){t.push(p)}function m(p){i.push(p)}function b(p){s.push(p)}function M(){n.setup(t)}function k(p){n.setupView(t,p)}const U={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:n,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:U,setupLights:M,setupLightsView:k,pushLight:f,pushShadow:m,pushLightProbeGrid:b}}function pd(e){let n=new WeakMap;function t(s,r=0){const f=n.get(s);let m;return f===void 0?(m=new Aa(e),n.set(s,[m])):r>=f.length?(m=new Aa(e),f.push(m)):m=f[r],m}function i(){n=new WeakMap}return{get:t,dispose:i}}const hd=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,md=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,_d=[new Ce(1,0,0),new Ce(-1,0,0),new Ce(0,1,0),new Ce(0,-1,0),new Ce(0,0,1),new Ce(0,0,-1)],gd=[new Ce(0,-1,0),new Ce(0,-1,0),new Ce(0,0,1),new Ce(0,0,-1),new Ce(0,-1,0),new Ce(0,-1,0)],ba=new tn,cn=new Ce,Kn=new Ce;function vd(e,n,t){let i=new Pa;const s=new je,r=new je,f=new St,m=new Zr,b=new $r,M={},k=t.maxTextureSize,U={[un]:Mt,[Mt]:un,[wt]:wt},p=new Ot({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new je},radius:{value:4}},vertexShader:hd,fragmentShader:md}),S=p.clone();S.defines.HORIZONTAL_PASS=1;const C=new Pn;C.setAttribute("position",new Tn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const G=new yt(C,p),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=An;let l=this.type;this.render=function(g,P,c){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||g.length===0)return;this.type===jr&&(Be("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=An);const _=e.getRenderTarget(),I=e.getActiveCubeFace(),R=e.getActiveMipmapLevel(),F=e.state;F.setBlending(Nt),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const j=l!==this.type;j&&P.traverse(function(Z){Z.material&&(Array.isArray(Z.material)?Z.material.forEach(W=>W.needsUpdate=!0):Z.material.needsUpdate=!0)});for(let Z=0,W=g.length;Z<W;Z++){const Y=g[Z],V=Y.shadow;if(V===void 0){Be("WebGLShadowMap:",Y,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);const $=V.getFrameExtents();s.multiply($),r.copy(V.mapSize),(s.x>k||s.y>k)&&(s.x>k&&(r.x=Math.floor(k/$.x),s.x=r.x*$.x,V.mapSize.x=r.x),s.y>k&&(r.y=Math.floor(k/$.y),s.y=r.y*$.y,V.mapSize.y=r.y));const ce=e.state.buffers.depth.getReversed();if(V.camera._reversedDepth=ce,V.map===null||j===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===fn){if(Y.isPointLight){Be("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new Ut(s.x,s.y,{format:an,type:kt,minFilter:xt,magFilter:xt,generateMipmaps:!1}),V.map.texture.name=Y.name+".shadowMap",V.map.depthTexture=new pn(s.x,s.y,Ht),V.map.depthTexture.name=Y.name+".shadowMapDepth",V.map.depthTexture.format=nn,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Xt,V.map.depthTexture.magFilter=Xt}else Y.isPointLight?(V.map=new Ja(s.x),V.map.depthTexture=new Qr(s.x,Yt)):(V.map=new Ut(s.x,s.y),V.map.depthTexture=new pn(s.x,s.y,Yt)),V.map.depthTexture.name=Y.name+".shadowMap",V.map.depthTexture.format=nn,this.type===An?(V.map.depthTexture.compareFunction=ce?ti:ni,V.map.depthTexture.minFilter=xt,V.map.depthTexture.magFilter=xt):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Xt,V.map.depthTexture.magFilter=Xt);V.camera.updateProjectionMatrix()}const ge=V.map.isWebGLCubeRenderTarget?6:1;for(let ve=0;ve<ge;ve++){if(V.map.isWebGLCubeRenderTarget)e.setRenderTarget(V.map,ve),e.clear();else{ve===0&&(e.setRenderTarget(V.map),e.clear());const xe=V.getViewport(ve);f.set(r.x*xe.x,r.y*xe.y,r.x*xe.z,r.y*xe.w),F.viewport(f)}if(Y.isPointLight){const xe=V.camera,Ye=V.matrix,ot=Y.distance||xe.far;ot!==xe.far&&(xe.far=ot,xe.updateProjectionMatrix()),cn.setFromMatrixPosition(Y.matrixWorld),xe.position.copy(cn),Kn.copy(xe.position),Kn.add(_d[ve]),xe.up.copy(gd[ve]),xe.lookAt(Kn),xe.updateMatrixWorld(),Ye.makeTranslation(-cn.x,-cn.y,-cn.z),ba.multiplyMatrices(xe.projectionMatrix,xe.matrixWorldInverse),V._frustum.setFromProjectionMatrix(ba,xe.coordinateSystem,xe.reversedDepth)}else V.updateMatrices(Y);i=V.getFrustum(),h(P,c,V.camera,Y,this.type)}V.isPointLightShadow!==!0&&this.type===fn&&O(V,c),V.needsUpdate=!1}l=this.type,d.needsUpdate=!1,e.setRenderTarget(_,I,R)};function O(g,P){const c=n.update(G);p.defines.VSM_SAMPLES!==g.blurSamples&&(p.defines.VSM_SAMPLES=g.blurSamples,S.defines.VSM_SAMPLES=g.blurSamples,p.needsUpdate=!0,S.needsUpdate=!0),g.mapPass===null&&(g.mapPass=new Ut(s.x,s.y,{format:an,type:kt})),p.uniforms.shadow_pass.value=g.map.depthTexture,p.uniforms.resolution.value=g.mapSize,p.uniforms.radius.value=g.radius,e.setRenderTarget(g.mapPass),e.clear(),e.renderBufferDirect(P,null,c,p,G,null),S.uniforms.shadow_pass.value=g.mapPass.texture,S.uniforms.resolution.value=g.mapSize,S.uniforms.radius.value=g.radius,e.setRenderTarget(g.map),e.clear(),e.renderBufferDirect(P,null,c,S,G,null)}function y(g,P,c,_){let I=null;const R=c.isPointLight===!0?g.customDistanceMaterial:g.customDepthMaterial;if(R!==void 0)I=R;else if(I=c.isPointLight===!0?b:m,e.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const F=I.uuid,j=P.uuid;let Z=M[F];Z===void 0&&(Z={},M[F]=Z);let W=Z[j];W===void 0&&(W=I.clone(),Z[j]=W,P.addEventListener("dispose",A)),I=W}if(I.visible=P.visible,I.wireframe=P.wireframe,_===fn?I.side=P.shadowSide!==null?P.shadowSide:P.side:I.side=P.shadowSide!==null?P.shadowSide:U[P.side],I.alphaMap=P.alphaMap,I.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,I.map=P.map,I.clipShadows=P.clipShadows,I.clippingPlanes=P.clippingPlanes,I.clipIntersection=P.clipIntersection,I.displacementMap=P.displacementMap,I.displacementScale=P.displacementScale,I.displacementBias=P.displacementBias,I.wireframeLinewidth=P.wireframeLinewidth,I.linewidth=P.linewidth,c.isPointLight===!0&&I.isMeshDistanceMaterial===!0){const F=e.properties.get(I);F.light=c}return I}function h(g,P,c,_,I){if(g.visible===!1)return;if(g.layers.test(P.layers)&&(g.isMesh||g.isLine||g.isPoints)&&(g.castShadow||g.receiveShadow&&I===fn)&&(!g.frustumCulled||i.intersectsObject(g))){g.modelViewMatrix.multiplyMatrices(c.matrixWorldInverse,g.matrixWorld);const j=n.update(g),Z=g.material;if(Array.isArray(Z)){const W=j.groups;for(let Y=0,V=W.length;Y<V;Y++){const $=W[Y],ce=Z[$.materialIndex];if(ce&&ce.visible){const ge=y(g,ce,_,I);g.onBeforeShadow(e,g,P,c,j,ge,$),e.renderBufferDirect(c,null,j,ge,g,$),g.onAfterShadow(e,g,P,c,j,ge,$)}}}else if(Z.visible){const W=y(g,Z,_,I);g.onBeforeShadow(e,g,P,c,j,W,null),e.renderBufferDirect(c,null,j,W,g,null),g.onAfterShadow(e,g,P,c,j,W,null)}}const F=g.children;for(let j=0,Z=F.length;j<Z;j++)h(F[j],P,c,_,I)}function A(g){g.target.removeEventListener("dispose",A);for(const c in M){const _=M[c],I=g.target.uuid;I in _&&(_[I].dispose(),delete _[I])}}}function Sd(e,n){function t(){let v=!1;const ee=new St;let z=null;const re=new St(0,0,0,0);return{setMask:function(de){z!==de&&!v&&(e.colorMask(de,de,de,de),z=de)},setLocked:function(de){v=de},setClear:function(de,q,_e,he,tt){tt===!0&&(de*=he,q*=he,_e*=he),ee.set(de,q,_e,he),re.equals(ee)===!1&&(e.clearColor(de,q,_e,he),re.copy(ee))},reset:function(){v=!1,z=null,re.set(-1,0,0,0)}}}function i(){let v=!1,ee=!1,z=null,re=null,de=null;return{setReversed:function(q){if(ee!==q){const _e=n.get("EXT_clip_control");q?_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.ZERO_TO_ONE_EXT):_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.NEGATIVE_ONE_TO_ONE_EXT),ee=q;const he=de;de=null,this.setClear(he)}},getReversed:function(){return ee},setTest:function(q){q?Q(e.DEPTH_TEST):Re(e.DEPTH_TEST)},setMask:function(q){z!==q&&!v&&(e.depthMask(q),z=q)},setFunc:function(q){if(ee&&(q=Do[q]),re!==q){switch(q){case po:e.depthFunc(e.NEVER);break;case uo:e.depthFunc(e.ALWAYS);break;case fo:e.depthFunc(e.LESS);break;case gi:e.depthFunc(e.LEQUAL);break;case co:e.depthFunc(e.EQUAL);break;case lo:e.depthFunc(e.GEQUAL);break;case so:e.depthFunc(e.GREATER);break;case oo:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}re=q}},setLocked:function(q){v=q},setClear:function(q){de!==q&&(de=q,ee&&(q=1-q),e.clearDepth(q))},reset:function(){v=!1,z=null,re=null,de=null,ee=!1}}}function s(){let v=!1,ee=null,z=null,re=null,de=null,q=null,_e=null,he=null,tt=null;return{setTest:function(Ke){v||(Ke?Q(e.STENCIL_TEST):Re(e.STENCIL_TEST))},setMask:function(Ke){ee!==Ke&&!v&&(e.stencilMask(Ke),ee=Ke)},setFunc:function(Ke,At,bt){(z!==Ke||re!==At||de!==bt)&&(e.stencilFunc(Ke,At,bt),z=Ke,re=At,de=bt)},setOp:function(Ke,At,bt){(q!==Ke||_e!==At||he!==bt)&&(e.stencilOp(Ke,At,bt),q=Ke,_e=At,he=bt)},setLocked:function(Ke){v=Ke},setClear:function(Ke){tt!==Ke&&(e.clearStencil(Ke),tt=Ke)},reset:function(){v=!1,ee=null,z=null,re=null,de=null,q=null,_e=null,he=null,tt=null}}}const r=new t,f=new i,m=new s,b=new WeakMap,M=new WeakMap;let k={},U={},p={},S=new WeakMap,C=[],G=null,d=!1,l=null,O=null,y=null,h=null,A=null,g=null,P=null,c=new Qe(0,0,0),_=0,I=!1,R=null,F=null,j=null,Z=null,W=null;const Y=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,$=0;const ce=e.getParameter(e.VERSION);ce.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(ce)[1]),V=$>=1):ce.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(ce)[1]),V=$>=2);let ge=null,ve={};const xe=e.getParameter(e.SCISSOR_BOX),Ye=e.getParameter(e.VIEWPORT),ot=new St().fromArray(xe),He=new St().fromArray(Ye);function K(v,ee,z,re){const de=new Uint8Array(4),q=e.createTexture();e.bindTexture(v,q),e.texParameteri(v,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(v,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let _e=0;_e<z;_e++)v===e.TEXTURE_3D||v===e.TEXTURE_2D_ARRAY?e.texImage3D(ee,0,e.RGBA,1,1,re,0,e.RGBA,e.UNSIGNED_BYTE,de):e.texImage2D(ee+_e,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,de);return q}const te={};te[e.TEXTURE_2D]=K(e.TEXTURE_2D,e.TEXTURE_2D,1),te[e.TEXTURE_CUBE_MAP]=K(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),te[e.TEXTURE_2D_ARRAY]=K(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),te[e.TEXTURE_3D]=K(e.TEXTURE_3D,e.TEXTURE_3D,1,1),r.setClear(0,0,0,1),f.setClear(1),m.setClear(0),Q(e.DEPTH_TEST),f.setFunc(gi),st(!1),ct(qi),Q(e.CULL_FACE),Fe(Nt);function Q(v){k[v]!==!0&&(e.enable(v),k[v]=!0)}function Re(v){k[v]!==!1&&(e.disable(v),k[v]=!1)}function Pe(v,ee){return p[v]!==ee?(e.bindFramebuffer(v,ee),p[v]=ee,v===e.DRAW_FRAMEBUFFER&&(p[e.FRAMEBUFFER]=ee),v===e.FRAMEBUFFER&&(p[e.DRAW_FRAMEBUFFER]=ee),!0):!1}function Ae(v,ee){let z=C,re=!1;if(v){z=S.get(ee),z===void 0&&(z=[],S.set(ee,z));const de=v.textures;if(z.length!==de.length||z[0]!==e.COLOR_ATTACHMENT0){for(let q=0,_e=de.length;q<_e;q++)z[q]=e.COLOR_ATTACHMENT0+q;z.length=de.length,re=!0}}else z[0]!==e.BACK&&(z[0]=e.BACK,re=!0);re&&e.drawBuffers(z)}function it(v){return G!==v?(e.useProgram(v),G=v,!0):!1}const Ie={[sn]:e.FUNC_ADD,[Ar]:e.FUNC_SUBTRACT,[Tr]:e.FUNC_REVERSE_SUBTRACT};Ie[Uo]=e.MIN,Ie[wo]=e.MAX;const We={[Gr]:e.ZERO,[Br]:e.ONE,[Fr]:e.SRC_COLOR,[Or]:e.SRC_ALPHA,[yr]:e.SRC_ALPHA_SATURATE,[Nr]:e.DST_COLOR,[Ir]:e.DST_ALPHA,[wr]:e.ONE_MINUS_SRC_COLOR,[Ur]:e.ONE_MINUS_SRC_ALPHA,[Dr]:e.ONE_MINUS_DST_COLOR,[Lr]:e.ONE_MINUS_DST_ALPHA,[Pr]:e.CONSTANT_COLOR,[Cr]:e.ONE_MINUS_CONSTANT_COLOR,[Rr]:e.CONSTANT_ALPHA,[br]:e.ONE_MINUS_CONSTANT_ALPHA};function Fe(v,ee,z,re,de,q,_e,he,tt,Ke){if(v===Nt){d===!0&&(Re(e.BLEND),d=!1);return}if(d===!1&&(Q(e.BLEND),d=!0),v!==_o){if(v!==l||Ke!==I){if((O!==sn||A!==sn)&&(e.blendEquation(e.FUNC_ADD),O=sn,A=sn),Ke)switch(v){case bn:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case ji:e.blendFunc(e.ONE,e.ONE);break;case $i:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case Zi:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:$e("WebGLState: Invalid blending: ",v);break}else switch(v){case bn:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case ji:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case $i:$e("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Zi:$e("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:$e("WebGLState: Invalid blending: ",v);break}y=null,h=null,g=null,P=null,c.set(0,0,0),_=0,l=v,I=Ke}return}de=de||ee,q=q||z,_e=_e||re,(ee!==O||de!==A)&&(e.blendEquationSeparate(Ie[ee],Ie[de]),O=ee,A=de),(z!==y||re!==h||q!==g||_e!==P)&&(e.blendFuncSeparate(We[z],We[re],We[q],We[_e]),y=z,h=re,g=q,P=_e),(he.equals(c)===!1||tt!==_)&&(e.blendColor(he.r,he.g,he.b,tt),c.copy(he),_=tt),l=v,I=!1}function ye(v,ee){v.side===wt?Re(e.CULL_FACE):Q(e.CULL_FACE);let z=v.side===Mt;ee&&(z=!z),st(z),v.blending===bn&&v.transparent===!1?Fe(Nt):Fe(v.blending,v.blendEquation,v.blendSrc,v.blendDst,v.blendEquationAlpha,v.blendSrcAlpha,v.blendDstAlpha,v.blendColor,v.blendAlpha,v.premultipliedAlpha),f.setFunc(v.depthFunc),f.setTest(v.depthTest),f.setMask(v.depthWrite),r.setMask(v.colorWrite);const re=v.stencilWrite;m.setTest(re),re&&(m.setMask(v.stencilWriteMask),m.setFunc(v.stencilFunc,v.stencilRef,v.stencilFuncMask),m.setOp(v.stencilFail,v.stencilZFail,v.stencilZPass)),ht(v.polygonOffset,v.polygonOffsetFactor,v.polygonOffsetUnits),v.alphaToCoverage===!0?Q(e.SAMPLE_ALPHA_TO_COVERAGE):Re(e.SAMPLE_ALPHA_TO_COVERAGE)}function st(v){R!==v&&(v?e.frontFace(e.CW):e.frontFace(e.CCW),R=v)}function ct(v){v!==ho?(Q(e.CULL_FACE),v!==F&&(v===qi?e.cullFace(e.BACK):v===mo?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):Re(e.CULL_FACE),F=v}function pt(v){v!==j&&(V&&e.lineWidth(v),j=v)}function ht(v,ee,z){v?(Q(e.POLYGON_OFFSET_FILL),(Z!==ee||W!==z)&&(Z=ee,W=z,f.getReversed()&&(ee=-ee),e.polygonOffset(ee,z))):Re(e.POLYGON_OFFSET_FILL)}function et(v){v?Q(e.SCISSOR_TEST):Re(e.SCISSOR_TEST)}function lt(v){v===void 0&&(v=e.TEXTURE0+Y-1),ge!==v&&(e.activeTexture(v),ge=v)}function E(v,ee,z){z===void 0&&(ge===null?z=e.TEXTURE0+Y-1:z=ge);let re=ve[z];re===void 0&&(re={type:void 0,texture:void 0},ve[z]=re),(re.type!==v||re.texture!==ee)&&(ge!==z&&(e.activeTexture(z),ge=z),e.bindTexture(v,ee||te[v]),re.type=v,re.texture=ee)}function _t(){const v=ve[ge];v!==void 0&&v.type!==void 0&&(e.bindTexture(v.type,null),v.type=void 0,v.texture=void 0)}function Ge(){try{e.compressedTexImage2D(...arguments)}catch(v){$e("WebGLState:",v)}}function u(){try{e.compressedTexImage3D(...arguments)}catch(v){$e("WebGLState:",v)}}function a(){try{e.texSubImage2D(...arguments)}catch(v){$e("WebGLState:",v)}}function T(){try{e.texSubImage3D(...arguments)}catch(v){$e("WebGLState:",v)}}function w(){try{e.compressedTexSubImage2D(...arguments)}catch(v){$e("WebGLState:",v)}}function B(){try{e.compressedTexSubImage3D(...arguments)}catch(v){$e("WebGLState:",v)}}function J(){try{e.texStorage2D(...arguments)}catch(v){$e("WebGLState:",v)}}function ne(){try{e.texStorage3D(...arguments)}catch(v){$e("WebGLState:",v)}}function H(){try{e.texImage2D(...arguments)}catch(v){$e("WebGLState:",v)}}function X(){try{e.texImage3D(...arguments)}catch(v){$e("WebGLState:",v)}}function ie(v){return U[v]!==void 0?U[v]:e.getParameter(v)}function Se(v,ee){U[v]!==ee&&(e.pixelStorei(v,ee),U[v]=ee)}function oe(v){ot.equals(v)===!1&&(e.scissor(v.x,v.y,v.z,v.w),ot.copy(v))}function ae(v){He.equals(v)===!1&&(e.viewport(v.x,v.y,v.z,v.w),He.copy(v))}function Te(v,ee){let z=M.get(ee);z===void 0&&(z=new WeakMap,M.set(ee,z));let re=z.get(v);re===void 0&&(re=e.getUniformBlockIndex(ee,v.name),z.set(v,re))}function be(v,ee){const re=M.get(ee).get(v);b.get(ee)!==re&&(e.uniformBlockBinding(ee,re,v.__bindingPointIndex),b.set(ee,re))}function Le(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),f.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),k={},U={},ge=null,ve={},p={},S=new WeakMap,C=[],G=null,d=!1,l=null,O=null,y=null,h=null,A=null,g=null,P=null,c=new Qe(0,0,0),_=0,I=!1,R=null,F=null,j=null,Z=null,W=null,ot.set(0,0,e.canvas.width,e.canvas.height),He.set(0,0,e.canvas.width,e.canvas.height),r.reset(),f.reset(),m.reset()}return{buffers:{color:r,depth:f,stencil:m},enable:Q,disable:Re,bindFramebuffer:Pe,drawBuffers:Ae,useProgram:it,setBlending:Fe,setMaterial:ye,setFlipSided:st,setCullFace:ct,setLineWidth:pt,setPolygonOffset:ht,setScissorTest:et,activeTexture:lt,bindTexture:E,unbindTexture:_t,compressedTexImage2D:Ge,compressedTexImage3D:u,texImage2D:H,texImage3D:X,pixelStorei:Se,getParameter:ie,updateUBOMapping:Te,uniformBlockBinding:be,texStorage2D:J,texStorage3D:ne,texSubImage2D:a,texSubImage3D:T,compressedTexSubImage2D:w,compressedTexSubImage3D:B,scissor:oe,viewport:ae,reset:Le}}function Ed(e,n,t,i,s,r,f){const m=n.has("WEBGL_multisampled_render_to_texture")?n.get("WEBGL_multisampled_render_to_texture"):null,b=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),M=new je,k=new WeakMap,U=new Set;let p;const S=new WeakMap;let C=!1;try{C=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function G(u,a){return C?new OffscreenCanvas(u,a):bo("canvas")}function d(u,a,T){let w=1;const B=Ge(u);if((B.width>T||B.height>T)&&(w=T/Math.max(B.width,B.height)),w<1)if(typeof HTMLImageElement<"u"&&u instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&u instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&u instanceof ImageBitmap||typeof VideoFrame<"u"&&u instanceof VideoFrame){const J=Math.floor(w*B.width),ne=Math.floor(w*B.height);p===void 0&&(p=G(J,ne));const H=a?G(J,ne):p;return H.width=J,H.height=ne,H.getContext("2d").drawImage(u,0,0,J,ne),Be("WebGLRenderer: Texture has been resized from ("+B.width+"x"+B.height+") to ("+J+"x"+ne+")."),H}else return"data"in u&&Be("WebGLRenderer: Image in DataTexture is too big ("+B.width+"x"+B.height+")."),u;return u}function l(u){return u.generateMipmaps}function O(u){e.generateMipmap(u)}function y(u){return u.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:u.isWebGL3DRenderTarget?e.TEXTURE_3D:u.isWebGLArrayRenderTarget||u.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function h(u,a,T,w,B,J=!1){if(u!==null){if(e[u]!==void 0)return e[u];Be("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+u+"'")}let ne;w&&(ne=n.get("EXT_texture_norm16"),ne||Be("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let H=a;if(a===e.RED&&(T===e.FLOAT&&(H=e.R32F),T===e.HALF_FLOAT&&(H=e.R16F),T===e.UNSIGNED_BYTE&&(H=e.R8),T===e.UNSIGNED_SHORT&&ne&&(H=ne.R16_EXT),T===e.SHORT&&ne&&(H=ne.R16_SNORM_EXT)),a===e.RED_INTEGER&&(T===e.UNSIGNED_BYTE&&(H=e.R8UI),T===e.UNSIGNED_SHORT&&(H=e.R16UI),T===e.UNSIGNED_INT&&(H=e.R32UI),T===e.BYTE&&(H=e.R8I),T===e.SHORT&&(H=e.R16I),T===e.INT&&(H=e.R32I)),a===e.RG&&(T===e.FLOAT&&(H=e.RG32F),T===e.HALF_FLOAT&&(H=e.RG16F),T===e.UNSIGNED_BYTE&&(H=e.RG8),T===e.UNSIGNED_SHORT&&ne&&(H=ne.RG16_EXT),T===e.SHORT&&ne&&(H=ne.RG16_SNORM_EXT)),a===e.RG_INTEGER&&(T===e.UNSIGNED_BYTE&&(H=e.RG8UI),T===e.UNSIGNED_SHORT&&(H=e.RG16UI),T===e.UNSIGNED_INT&&(H=e.RG32UI),T===e.BYTE&&(H=e.RG8I),T===e.SHORT&&(H=e.RG16I),T===e.INT&&(H=e.RG32I)),a===e.RGB_INTEGER&&(T===e.UNSIGNED_BYTE&&(H=e.RGB8UI),T===e.UNSIGNED_SHORT&&(H=e.RGB16UI),T===e.UNSIGNED_INT&&(H=e.RGB32UI),T===e.BYTE&&(H=e.RGB8I),T===e.SHORT&&(H=e.RGB16I),T===e.INT&&(H=e.RGB32I)),a===e.RGBA_INTEGER&&(T===e.UNSIGNED_BYTE&&(H=e.RGBA8UI),T===e.UNSIGNED_SHORT&&(H=e.RGBA16UI),T===e.UNSIGNED_INT&&(H=e.RGBA32UI),T===e.BYTE&&(H=e.RGBA8I),T===e.SHORT&&(H=e.RGBA16I),T===e.INT&&(H=e.RGBA32I)),a===e.RGB&&(T===e.UNSIGNED_SHORT&&ne&&(H=ne.RGB16_EXT),T===e.SHORT&&ne&&(H=ne.RGB16_SNORM_EXT),T===e.UNSIGNED_INT_5_9_9_9_REV&&(H=e.RGB9_E5),T===e.UNSIGNED_INT_10F_11F_11F_REV&&(H=e.R11F_G11F_B10F)),a===e.RGBA){const X=J?Za:Je.getTransfer(B);T===e.FLOAT&&(H=e.RGBA32F),T===e.HALF_FLOAT&&(H=e.RGBA16F),T===e.UNSIGNED_BYTE&&(H=X===Ze?e.SRGB8_ALPHA8:e.RGBA8),T===e.UNSIGNED_SHORT&&ne&&(H=ne.RGBA16_EXT),T===e.SHORT&&ne&&(H=ne.RGBA16_SNORM_EXT),T===e.UNSIGNED_SHORT_4_4_4_4&&(H=e.RGBA4),T===e.UNSIGNED_SHORT_5_5_5_1&&(H=e.RGB5_A1)}return(H===e.R16F||H===e.R32F||H===e.RG16F||H===e.RG32F||H===e.RGBA16F||H===e.RGBA32F)&&n.get("EXT_color_buffer_float"),H}function A(u,a){let T;return u?a===null||a===Yt||a===hn?T=e.DEPTH24_STENCIL8:a===Ht?T=e.DEPTH32F_STENCIL8:a===Cn&&(T=e.DEPTH24_STENCIL8,Be("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):a===null||a===Yt||a===hn?T=e.DEPTH_COMPONENT24:a===Ht?T=e.DEPTH_COMPONENT32F:a===Cn&&(T=e.DEPTH_COMPONENT16),T}function g(u,a){return l(u)===!0||u.isFramebufferTexture&&u.minFilter!==Xt&&u.minFilter!==xt?Math.log2(Math.max(a.width,a.height))+1:u.mipmaps!==void 0&&u.mipmaps.length>0?u.mipmaps.length:u.isCompressedTexture&&Array.isArray(u.image)?a.mipmaps.length:1}function P(u){const a=u.target;a.removeEventListener("dispose",P),_(a),a.isVideoTexture&&k.delete(a),a.isHTMLTexture&&U.delete(a)}function c(u){const a=u.target;a.removeEventListener("dispose",c),R(a)}function _(u){const a=i.get(u);if(a.__webglInit===void 0)return;const T=u.source,w=S.get(T);if(w){const B=w[a.__cacheKey];B.usedTimes--,B.usedTimes===0&&I(u),Object.keys(w).length===0&&S.delete(T)}i.remove(u)}function I(u){const a=i.get(u);e.deleteTexture(a.__webglTexture);const T=u.source,w=S.get(T);delete w[a.__cacheKey],f.memory.textures--}function R(u){const a=i.get(u);if(u.depthTexture&&(u.depthTexture.dispose(),i.remove(u.depthTexture)),u.isWebGLCubeRenderTarget)for(let w=0;w<6;w++){if(Array.isArray(a.__webglFramebuffer[w]))for(let B=0;B<a.__webglFramebuffer[w].length;B++)e.deleteFramebuffer(a.__webglFramebuffer[w][B]);else e.deleteFramebuffer(a.__webglFramebuffer[w]);a.__webglDepthbuffer&&e.deleteRenderbuffer(a.__webglDepthbuffer[w])}else{if(Array.isArray(a.__webglFramebuffer))for(let w=0;w<a.__webglFramebuffer.length;w++)e.deleteFramebuffer(a.__webglFramebuffer[w]);else e.deleteFramebuffer(a.__webglFramebuffer);if(a.__webglDepthbuffer&&e.deleteRenderbuffer(a.__webglDepthbuffer),a.__webglMultisampledFramebuffer&&e.deleteFramebuffer(a.__webglMultisampledFramebuffer),a.__webglColorRenderbuffer)for(let w=0;w<a.__webglColorRenderbuffer.length;w++)a.__webglColorRenderbuffer[w]&&e.deleteRenderbuffer(a.__webglColorRenderbuffer[w]);a.__webglDepthRenderbuffer&&e.deleteRenderbuffer(a.__webglDepthRenderbuffer)}const T=u.textures;for(let w=0,B=T.length;w<B;w++){const J=i.get(T[w]);J.__webglTexture&&(e.deleteTexture(J.__webglTexture),f.memory.textures--),i.remove(T[w])}i.remove(u)}let F=0;function j(){F=0}function Z(){return F}function W(u){F=u}function Y(){const u=F;return u>=s.maxTextures&&Be("WebGLTextures: Trying to use "+u+" texture units while this GPU supports only "+s.maxTextures),F+=1,u}function V(u){const a=[];return a.push(u.wrapS),a.push(u.wrapT),a.push(u.wrapR||0),a.push(u.magFilter),a.push(u.minFilter),a.push(u.anisotropy),a.push(u.internalFormat),a.push(u.format),a.push(u.type),a.push(u.generateMipmaps),a.push(u.premultiplyAlpha),a.push(u.flipY),a.push(u.unpackAlignment),a.push(u.colorSpace),a.join()}function $(u,a){const T=i.get(u);if(u.isVideoTexture&&E(u),u.isRenderTargetTexture===!1&&u.isExternalTexture!==!0&&u.version>0&&T.__version!==u.version){const w=u.image;if(w===null)Be("WebGLRenderer: Texture marked for update but no image data found.");else if(w.complete===!1)Be("WebGLRenderer: Texture marked for update but image is incomplete");else{Re(T,u,a);return}}else u.isExternalTexture&&(T.__webglTexture=u.sourceTexture?u.sourceTexture:null);t.bindTexture(e.TEXTURE_2D,T.__webglTexture,e.TEXTURE0+a)}function ce(u,a){const T=i.get(u);if(u.isRenderTargetTexture===!1&&u.version>0&&T.__version!==u.version){Re(T,u,a);return}else u.isExternalTexture&&(T.__webglTexture=u.sourceTexture?u.sourceTexture:null);t.bindTexture(e.TEXTURE_2D_ARRAY,T.__webglTexture,e.TEXTURE0+a)}function ge(u,a){const T=i.get(u);if(u.isRenderTargetTexture===!1&&u.version>0&&T.__version!==u.version){Re(T,u,a);return}t.bindTexture(e.TEXTURE_3D,T.__webglTexture,e.TEXTURE0+a)}function ve(u,a){const T=i.get(u);if(u.isCubeDepthTexture!==!0&&u.version>0&&T.__version!==u.version){Pe(T,u,a);return}t.bindTexture(e.TEXTURE_CUBE_MAP,T.__webglTexture,e.TEXTURE0+a)}const xe={[Vr]:e.REPEAT,[Zn]:e.CLAMP_TO_EDGE,[Hr]:e.MIRRORED_REPEAT},Ye={[Xt]:e.NEAREST,[kr]:e.NEAREST_MIPMAP_NEAREST,[vn]:e.NEAREST_MIPMAP_LINEAR,[xt]:e.LINEAR,[yn]:e.LINEAR_MIPMAP_NEAREST,[jt]:e.LINEAR_MIPMAP_LINEAR},ot={[qr]:e.NEVER,[Kr]:e.ALWAYS,[Yr]:e.LESS,[ni]:e.LEQUAL,[Xr]:e.EQUAL,[ti]:e.GEQUAL,[zr]:e.GREATER,[Wr]:e.NOTEQUAL};function He(u,a){if(a.type===Ht&&n.has("OES_texture_float_linear")===!1&&(a.magFilter===xt||a.magFilter===yn||a.magFilter===vn||a.magFilter===jt||a.minFilter===xt||a.minFilter===yn||a.minFilter===vn||a.minFilter===jt)&&Be("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(u,e.TEXTURE_WRAP_S,xe[a.wrapS]),e.texParameteri(u,e.TEXTURE_WRAP_T,xe[a.wrapT]),(u===e.TEXTURE_3D||u===e.TEXTURE_2D_ARRAY)&&e.texParameteri(u,e.TEXTURE_WRAP_R,xe[a.wrapR]),e.texParameteri(u,e.TEXTURE_MAG_FILTER,Ye[a.magFilter]),e.texParameteri(u,e.TEXTURE_MIN_FILTER,Ye[a.minFilter]),a.compareFunction&&(e.texParameteri(u,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(u,e.TEXTURE_COMPARE_FUNC,ot[a.compareFunction])),n.has("EXT_texture_filter_anisotropic")===!0){if(a.magFilter===Xt||a.minFilter!==vn&&a.minFilter!==jt||a.type===Ht&&n.has("OES_texture_float_linear")===!1)return;if(a.anisotropy>1||i.get(a).__currentAnisotropy){const T=n.get("EXT_texture_filter_anisotropic");e.texParameterf(u,T.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,s.getMaxAnisotropy())),i.get(a).__currentAnisotropy=a.anisotropy}}}function K(u,a){let T=!1;u.__webglInit===void 0&&(u.__webglInit=!0,a.addEventListener("dispose",P));const w=a.source;let B=S.get(w);B===void 0&&(B={},S.set(w,B));const J=V(a);if(J!==u.__cacheKey){B[J]===void 0&&(B[J]={texture:e.createTexture(),usedTimes:0},f.memory.textures++,T=!0),B[J].usedTimes++;const ne=B[u.__cacheKey];ne!==void 0&&(B[u.__cacheKey].usedTimes--,ne.usedTimes===0&&I(a)),u.__cacheKey=J,u.__webglTexture=B[J].texture}return T}function te(u,a,T){return Math.floor(Math.floor(u/T)/a)}function Q(u,a,T,w){const J=u.updateRanges;if(J.length===0)t.texSubImage2D(e.TEXTURE_2D,0,0,0,a.width,a.height,T,w,a.data);else{J.sort((Se,oe)=>Se.start-oe.start);let ne=0;for(let Se=1;Se<J.length;Se++){const oe=J[ne],ae=J[Se],Te=oe.start+oe.count,be=te(ae.start,a.width,4),Le=te(oe.start,a.width,4);ae.start<=Te+1&&be===Le&&te(ae.start+ae.count-1,a.width,4)===be?oe.count=Math.max(oe.count,ae.start+ae.count-oe.start):(++ne,J[ne]=ae)}J.length=ne+1;const H=t.getParameter(e.UNPACK_ROW_LENGTH),X=t.getParameter(e.UNPACK_SKIP_PIXELS),ie=t.getParameter(e.UNPACK_SKIP_ROWS);t.pixelStorei(e.UNPACK_ROW_LENGTH,a.width);for(let Se=0,oe=J.length;Se<oe;Se++){const ae=J[Se],Te=Math.floor(ae.start/4),be=Math.ceil(ae.count/4),Le=Te%a.width,v=Math.floor(Te/a.width),ee=be,z=1;t.pixelStorei(e.UNPACK_SKIP_PIXELS,Le),t.pixelStorei(e.UNPACK_SKIP_ROWS,v),t.texSubImage2D(e.TEXTURE_2D,0,Le,v,ee,z,T,w,a.data)}u.clearUpdateRanges(),t.pixelStorei(e.UNPACK_ROW_LENGTH,H),t.pixelStorei(e.UNPACK_SKIP_PIXELS,X),t.pixelStorei(e.UNPACK_SKIP_ROWS,ie)}}function Re(u,a,T){let w=e.TEXTURE_2D;(a.isDataArrayTexture||a.isCompressedArrayTexture)&&(w=e.TEXTURE_2D_ARRAY),a.isData3DTexture&&(w=e.TEXTURE_3D);const B=K(u,a),J=a.source;t.bindTexture(w,u.__webglTexture,e.TEXTURE0+T);const ne=i.get(J);if(J.version!==ne.__version||B===!0){if(t.activeTexture(e.TEXTURE0+T),(typeof ImageBitmap<"u"&&a.image instanceof ImageBitmap)===!1){const z=Je.getPrimaries(Je.workingColorSpace),re=a.colorSpace===$t?null:Je.getPrimaries(a.colorSpace),de=a.colorSpace===$t||z===re?e.NONE:e.BROWSER_DEFAULT_WEBGL;t.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,a.flipY),t.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,a.premultiplyAlpha),t.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,de)}t.pixelStorei(e.UNPACK_ALIGNMENT,a.unpackAlignment);let X=d(a.image,!1,s.maxTextureSize);X=_t(a,X);const ie=r.convert(a.format,a.colorSpace),Se=r.convert(a.type);let oe=h(a.internalFormat,ie,Se,a.normalized,a.colorSpace,a.isVideoTexture);He(w,a);let ae;const Te=a.mipmaps,be=a.isVideoTexture!==!0,Le=ne.__version===void 0||B===!0,v=J.dataReady,ee=g(a,X);if(a.isDepthTexture)oe=A(a.format===Qt,a.type),Le&&(be?t.texStorage2D(e.TEXTURE_2D,1,oe,X.width,X.height):t.texImage2D(e.TEXTURE_2D,0,oe,X.width,X.height,0,ie,Se,null));else if(a.isDataTexture)if(Te.length>0){be&&Le&&t.texStorage2D(e.TEXTURE_2D,ee,oe,Te[0].width,Te[0].height);for(let z=0,re=Te.length;z<re;z++)ae=Te[z],be?v&&t.texSubImage2D(e.TEXTURE_2D,z,0,0,ae.width,ae.height,ie,Se,ae.data):t.texImage2D(e.TEXTURE_2D,z,oe,ae.width,ae.height,0,ie,Se,ae.data);a.generateMipmaps=!1}else be?(Le&&t.texStorage2D(e.TEXTURE_2D,ee,oe,X.width,X.height),v&&Q(a,X,ie,Se)):t.texImage2D(e.TEXTURE_2D,0,oe,X.width,X.height,0,ie,Se,X.data);else if(a.isCompressedTexture)if(a.isCompressedArrayTexture){be&&Le&&t.texStorage3D(e.TEXTURE_2D_ARRAY,ee,oe,Te[0].width,Te[0].height,X.depth);for(let z=0,re=Te.length;z<re;z++)if(ae=Te[z],a.format!==It)if(ie!==null)if(be){if(v)if(a.layerUpdates.size>0){const de=Ji(ae.width,ae.height,a.format,a.type);for(const q of a.layerUpdates){const _e=ae.data.subarray(q*de/ae.data.BYTES_PER_ELEMENT,(q+1)*de/ae.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,z,0,0,q,ae.width,ae.height,1,ie,_e)}a.clearLayerUpdates()}else t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,z,0,0,0,ae.width,ae.height,X.depth,ie,ae.data)}else t.compressedTexImage3D(e.TEXTURE_2D_ARRAY,z,oe,ae.width,ae.height,X.depth,0,ae.data,0,0);else Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else be?v&&t.texSubImage3D(e.TEXTURE_2D_ARRAY,z,0,0,0,ae.width,ae.height,X.depth,ie,Se,ae.data):t.texImage3D(e.TEXTURE_2D_ARRAY,z,oe,ae.width,ae.height,X.depth,0,ie,Se,ae.data)}else{be&&Le&&t.texStorage2D(e.TEXTURE_2D,ee,oe,Te[0].width,Te[0].height);for(let z=0,re=Te.length;z<re;z++)ae=Te[z],a.format!==It?ie!==null?be?v&&t.compressedTexSubImage2D(e.TEXTURE_2D,z,0,0,ae.width,ae.height,ie,ae.data):t.compressedTexImage2D(e.TEXTURE_2D,z,oe,ae.width,ae.height,0,ae.data):Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):be?v&&t.texSubImage2D(e.TEXTURE_2D,z,0,0,ae.width,ae.height,ie,Se,ae.data):t.texImage2D(e.TEXTURE_2D,z,oe,ae.width,ae.height,0,ie,Se,ae.data)}else if(a.isDataArrayTexture)if(be){if(Le&&t.texStorage3D(e.TEXTURE_2D_ARRAY,ee,oe,X.width,X.height,X.depth),v)if(a.layerUpdates.size>0){const z=Ji(X.width,X.height,a.format,a.type);for(const re of a.layerUpdates){const de=X.data.subarray(re*z/X.data.BYTES_PER_ELEMENT,(re+1)*z/X.data.BYTES_PER_ELEMENT);t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,re,X.width,X.height,1,ie,Se,de)}a.clearLayerUpdates()}else t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,X.width,X.height,X.depth,ie,Se,X.data)}else t.texImage3D(e.TEXTURE_2D_ARRAY,0,oe,X.width,X.height,X.depth,0,ie,Se,X.data);else if(a.isData3DTexture)be?(Le&&t.texStorage3D(e.TEXTURE_3D,ee,oe,X.width,X.height,X.depth),v&&t.texSubImage3D(e.TEXTURE_3D,0,0,0,0,X.width,X.height,X.depth,ie,Se,X.data)):t.texImage3D(e.TEXTURE_3D,0,oe,X.width,X.height,X.depth,0,ie,Se,X.data);else if(a.isFramebufferTexture){if(Le)if(be)t.texStorage2D(e.TEXTURE_2D,ee,oe,X.width,X.height);else{let z=X.width,re=X.height;for(let de=0;de<ee;de++)t.texImage2D(e.TEXTURE_2D,de,oe,z,re,0,ie,Se,null),z>>=1,re>>=1}}else if(a.isHTMLTexture){if("texElementImage2D"in e){const z=e.canvas;if(z.hasAttribute("layoutsubtree")||z.setAttribute("layoutsubtree","true"),X.parentNode!==z){z.appendChild(X),U.add(a),z.onpaint=re=>{const de=re.changedElements;for(const q of U)de.includes(q.image)&&(q.needsUpdate=!0)},z.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,X);else{const de=e.RGBA,q=e.RGBA,_e=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,de,q,_e,X)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(Te.length>0){if(be&&Le){const z=Ge(Te[0]);t.texStorage2D(e.TEXTURE_2D,ee,oe,z.width,z.height)}for(let z=0,re=Te.length;z<re;z++)ae=Te[z],be?v&&t.texSubImage2D(e.TEXTURE_2D,z,0,0,ie,Se,ae):t.texImage2D(e.TEXTURE_2D,z,oe,ie,Se,ae);a.generateMipmaps=!1}else if(be){if(Le){const z=Ge(X);t.texStorage2D(e.TEXTURE_2D,ee,oe,z.width,z.height)}v&&t.texSubImage2D(e.TEXTURE_2D,0,0,0,ie,Se,X)}else t.texImage2D(e.TEXTURE_2D,0,oe,ie,Se,X);l(a)&&O(w),ne.__version=J.version,a.onUpdate&&a.onUpdate(a)}u.__version=a.version}function Pe(u,a,T){if(a.image.length!==6)return;const w=K(u,a),B=a.source;t.bindTexture(e.TEXTURE_CUBE_MAP,u.__webglTexture,e.TEXTURE0+T);const J=i.get(B);if(B.version!==J.__version||w===!0){t.activeTexture(e.TEXTURE0+T);const ne=Je.getPrimaries(Je.workingColorSpace),H=a.colorSpace===$t?null:Je.getPrimaries(a.colorSpace),X=a.colorSpace===$t||ne===H?e.NONE:e.BROWSER_DEFAULT_WEBGL;t.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,a.flipY),t.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,a.premultiplyAlpha),t.pixelStorei(e.UNPACK_ALIGNMENT,a.unpackAlignment),t.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,X);const ie=a.isCompressedTexture||a.image[0].isCompressedTexture,Se=a.image[0]&&a.image[0].isDataTexture,oe=[];for(let q=0;q<6;q++)!ie&&!Se?oe[q]=d(a.image[q],!0,s.maxCubemapSize):oe[q]=Se?a.image[q].image:a.image[q],oe[q]=_t(a,oe[q]);const ae=oe[0],Te=r.convert(a.format,a.colorSpace),be=r.convert(a.type),Le=h(a.internalFormat,Te,be,a.normalized,a.colorSpace),v=a.isVideoTexture!==!0,ee=J.__version===void 0||w===!0,z=B.dataReady;let re=g(a,ae);He(e.TEXTURE_CUBE_MAP,a);let de;if(ie){v&&ee&&t.texStorage2D(e.TEXTURE_CUBE_MAP,re,Le,ae.width,ae.height);for(let q=0;q<6;q++){de=oe[q].mipmaps;for(let _e=0;_e<de.length;_e++){const he=de[_e];a.format!==It?Te!==null?v?z&&t.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+q,_e,0,0,he.width,he.height,Te,he.data):t.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+q,_e,Le,he.width,he.height,0,he.data):Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):v?z&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+q,_e,0,0,he.width,he.height,Te,be,he.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+q,_e,Le,he.width,he.height,0,Te,be,he.data)}}}else{if(de=a.mipmaps,v&&ee){de.length>0&&re++;const q=Ge(oe[0]);t.texStorage2D(e.TEXTURE_CUBE_MAP,re,Le,q.width,q.height)}for(let q=0;q<6;q++)if(Se){v?z&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,oe[q].width,oe[q].height,Te,be,oe[q].data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Le,oe[q].width,oe[q].height,0,Te,be,oe[q].data);for(let _e=0;_e<de.length;_e++){const tt=de[_e].image[q].image;v?z&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+q,_e+1,0,0,tt.width,tt.height,Te,be,tt.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+q,_e+1,Le,tt.width,tt.height,0,Te,be,tt.data)}}else{v?z&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,Te,be,oe[q]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Le,Te,be,oe[q]);for(let _e=0;_e<de.length;_e++){const he=de[_e];v?z&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+q,_e+1,0,0,Te,be,he.image[q]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+q,_e+1,Le,Te,be,he.image[q])}}}l(a)&&O(e.TEXTURE_CUBE_MAP),J.__version=B.version,a.onUpdate&&a.onUpdate(a)}u.__version=a.version}function Ae(u,a,T,w,B,J){const ne=r.convert(T.format,T.colorSpace),H=r.convert(T.type),X=h(T.internalFormat,ne,H,T.normalized,T.colorSpace),ie=i.get(a),Se=i.get(T);if(Se.__renderTarget=a,!ie.__hasExternalTextures){const oe=Math.max(1,a.width>>J),ae=Math.max(1,a.height>>J);B===e.TEXTURE_3D||B===e.TEXTURE_2D_ARRAY?t.texImage3D(B,J,X,oe,ae,a.depth,0,ne,H,null):t.texImage2D(B,J,X,oe,ae,0,ne,H,null)}t.bindFramebuffer(e.FRAMEBUFFER,u),lt(a)?m.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,w,B,Se.__webglTexture,0,et(a)):(B===e.TEXTURE_2D||B>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&B<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,w,B,Se.__webglTexture,J),t.bindFramebuffer(e.FRAMEBUFFER,null)}function it(u,a,T){if(e.bindRenderbuffer(e.RENDERBUFFER,u),a.depthBuffer){const w=a.depthTexture,B=w&&w.isDepthTexture?w.type:null,J=A(a.stencilBuffer,B),ne=a.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;lt(a)?m.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,et(a),J,a.width,a.height):T?e.renderbufferStorageMultisample(e.RENDERBUFFER,et(a),J,a.width,a.height):e.renderbufferStorage(e.RENDERBUFFER,J,a.width,a.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,ne,e.RENDERBUFFER,u)}else{const w=a.textures;for(let B=0;B<w.length;B++){const J=w[B],ne=r.convert(J.format,J.colorSpace),H=r.convert(J.type),X=h(J.internalFormat,ne,H,J.normalized,J.colorSpace);lt(a)?m.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,et(a),X,a.width,a.height):T?e.renderbufferStorageMultisample(e.RENDERBUFFER,et(a),X,a.width,a.height):e.renderbufferStorage(e.RENDERBUFFER,X,a.width,a.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Ie(u,a,T){const w=a.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(e.FRAMEBUFFER,u),!(a.depthTexture&&a.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const B=i.get(a.depthTexture);if(B.__renderTarget=a,(!B.__webglTexture||a.depthTexture.image.width!==a.width||a.depthTexture.image.height!==a.height)&&(a.depthTexture.image.width=a.width,a.depthTexture.image.height=a.height,a.depthTexture.needsUpdate=!0),w){if(B.__webglInit===void 0&&(B.__webglInit=!0,a.depthTexture.addEventListener("dispose",P)),B.__webglTexture===void 0){B.__webglTexture=e.createTexture(),t.bindTexture(e.TEXTURE_CUBE_MAP,B.__webglTexture),He(e.TEXTURE_CUBE_MAP,a.depthTexture);const ie=r.convert(a.depthTexture.format),Se=r.convert(a.depthTexture.type);let oe;a.depthTexture.format===nn?oe=e.DEPTH_COMPONENT24:a.depthTexture.format===Qt&&(oe=e.DEPTH24_STENCIL8);for(let ae=0;ae<6;ae++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,oe,a.width,a.height,0,ie,Se,null)}}else $(a.depthTexture,0);const J=B.__webglTexture,ne=et(a),H=w?e.TEXTURE_CUBE_MAP_POSITIVE_X+T:e.TEXTURE_2D,X=a.depthTexture.format===Qt?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(a.depthTexture.format===nn)lt(a)?m.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,X,H,J,0,ne):e.framebufferTexture2D(e.FRAMEBUFFER,X,H,J,0);else if(a.depthTexture.format===Qt)lt(a)?m.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,X,H,J,0,ne):e.framebufferTexture2D(e.FRAMEBUFFER,X,H,J,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function We(u){const a=i.get(u),T=u.isWebGLCubeRenderTarget===!0;if(a.__boundDepthTexture!==u.depthTexture){const w=u.depthTexture;if(a.__depthDisposeCallback&&a.__depthDisposeCallback(),w){const B=()=>{delete a.__boundDepthTexture,delete a.__depthDisposeCallback,w.removeEventListener("dispose",B)};w.addEventListener("dispose",B),a.__depthDisposeCallback=B}a.__boundDepthTexture=w}if(u.depthTexture&&!a.__autoAllocateDepthBuffer)if(T)for(let w=0;w<6;w++)Ie(a.__webglFramebuffer[w],u,w);else{const w=u.texture.mipmaps;w&&w.length>0?Ie(a.__webglFramebuffer[0],u,0):Ie(a.__webglFramebuffer,u,0)}else if(T){a.__webglDepthbuffer=[];for(let w=0;w<6;w++)if(t.bindFramebuffer(e.FRAMEBUFFER,a.__webglFramebuffer[w]),a.__webglDepthbuffer[w]===void 0)a.__webglDepthbuffer[w]=e.createRenderbuffer(),it(a.__webglDepthbuffer[w],u,!1);else{const B=u.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,J=a.__webglDepthbuffer[w];e.bindRenderbuffer(e.RENDERBUFFER,J),e.framebufferRenderbuffer(e.FRAMEBUFFER,B,e.RENDERBUFFER,J)}}else{const w=u.texture.mipmaps;if(w&&w.length>0?t.bindFramebuffer(e.FRAMEBUFFER,a.__webglFramebuffer[0]):t.bindFramebuffer(e.FRAMEBUFFER,a.__webglFramebuffer),a.__webglDepthbuffer===void 0)a.__webglDepthbuffer=e.createRenderbuffer(),it(a.__webglDepthbuffer,u,!1);else{const B=u.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,J=a.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,J),e.framebufferRenderbuffer(e.FRAMEBUFFER,B,e.RENDERBUFFER,J)}}t.bindFramebuffer(e.FRAMEBUFFER,null)}function Fe(u,a,T){const w=i.get(u);a!==void 0&&Ae(w.__webglFramebuffer,u,u.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),T!==void 0&&We(u)}function ye(u){const a=u.texture,T=i.get(u),w=i.get(a);u.addEventListener("dispose",c);const B=u.textures,J=u.isWebGLCubeRenderTarget===!0,ne=B.length>1;if(ne||(w.__webglTexture===void 0&&(w.__webglTexture=e.createTexture()),w.__version=a.version,f.memory.textures++),J){T.__webglFramebuffer=[];for(let H=0;H<6;H++)if(a.mipmaps&&a.mipmaps.length>0){T.__webglFramebuffer[H]=[];for(let X=0;X<a.mipmaps.length;X++)T.__webglFramebuffer[H][X]=e.createFramebuffer()}else T.__webglFramebuffer[H]=e.createFramebuffer()}else{if(a.mipmaps&&a.mipmaps.length>0){T.__webglFramebuffer=[];for(let H=0;H<a.mipmaps.length;H++)T.__webglFramebuffer[H]=e.createFramebuffer()}else T.__webglFramebuffer=e.createFramebuffer();if(ne)for(let H=0,X=B.length;H<X;H++){const ie=i.get(B[H]);ie.__webglTexture===void 0&&(ie.__webglTexture=e.createTexture(),f.memory.textures++)}if(u.samples>0&&lt(u)===!1){T.__webglMultisampledFramebuffer=e.createFramebuffer(),T.__webglColorRenderbuffer=[],t.bindFramebuffer(e.FRAMEBUFFER,T.__webglMultisampledFramebuffer);for(let H=0;H<B.length;H++){const X=B[H];T.__webglColorRenderbuffer[H]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,T.__webglColorRenderbuffer[H]);const ie=r.convert(X.format,X.colorSpace),Se=r.convert(X.type),oe=h(X.internalFormat,ie,Se,X.normalized,X.colorSpace,u.isXRRenderTarget===!0),ae=et(u);e.renderbufferStorageMultisample(e.RENDERBUFFER,ae,oe,u.width,u.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+H,e.RENDERBUFFER,T.__webglColorRenderbuffer[H])}e.bindRenderbuffer(e.RENDERBUFFER,null),u.depthBuffer&&(T.__webglDepthRenderbuffer=e.createRenderbuffer(),it(T.__webglDepthRenderbuffer,u,!0)),t.bindFramebuffer(e.FRAMEBUFFER,null)}}if(J){t.bindTexture(e.TEXTURE_CUBE_MAP,w.__webglTexture),He(e.TEXTURE_CUBE_MAP,a);for(let H=0;H<6;H++)if(a.mipmaps&&a.mipmaps.length>0)for(let X=0;X<a.mipmaps.length;X++)Ae(T.__webglFramebuffer[H][X],u,a,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+H,X);else Ae(T.__webglFramebuffer[H],u,a,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+H,0);l(a)&&O(e.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ne){for(let H=0,X=B.length;H<X;H++){const ie=B[H],Se=i.get(ie);let oe=e.TEXTURE_2D;(u.isWebGL3DRenderTarget||u.isWebGLArrayRenderTarget)&&(oe=u.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),t.bindTexture(oe,Se.__webglTexture),He(oe,ie),Ae(T.__webglFramebuffer,u,ie,e.COLOR_ATTACHMENT0+H,oe,0),l(ie)&&O(oe)}t.unbindTexture()}else{let H=e.TEXTURE_2D;if((u.isWebGL3DRenderTarget||u.isWebGLArrayRenderTarget)&&(H=u.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),t.bindTexture(H,w.__webglTexture),He(H,a),a.mipmaps&&a.mipmaps.length>0)for(let X=0;X<a.mipmaps.length;X++)Ae(T.__webglFramebuffer[X],u,a,e.COLOR_ATTACHMENT0,H,X);else Ae(T.__webglFramebuffer,u,a,e.COLOR_ATTACHMENT0,H,0);l(a)&&O(H),t.unbindTexture()}u.depthBuffer&&We(u)}function st(u){const a=u.textures;for(let T=0,w=a.length;T<w;T++){const B=a[T];if(l(B)){const J=y(u),ne=i.get(B).__webglTexture;t.bindTexture(J,ne),O(J),t.unbindTexture()}}}const ct=[],pt=[];function ht(u){if(u.samples>0){if(lt(u)===!1){const a=u.textures,T=u.width,w=u.height;let B=e.COLOR_BUFFER_BIT;const J=u.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,ne=i.get(u),H=a.length>1;if(H)for(let ie=0;ie<a.length;ie++)t.bindFramebuffer(e.FRAMEBUFFER,ne.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ie,e.RENDERBUFFER,null),t.bindFramebuffer(e.FRAMEBUFFER,ne.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+ie,e.TEXTURE_2D,null,0);t.bindFramebuffer(e.READ_FRAMEBUFFER,ne.__webglMultisampledFramebuffer);const X=u.texture.mipmaps;X&&X.length>0?t.bindFramebuffer(e.DRAW_FRAMEBUFFER,ne.__webglFramebuffer[0]):t.bindFramebuffer(e.DRAW_FRAMEBUFFER,ne.__webglFramebuffer);for(let ie=0;ie<a.length;ie++){if(u.resolveDepthBuffer&&(u.depthBuffer&&(B|=e.DEPTH_BUFFER_BIT),u.stencilBuffer&&u.resolveStencilBuffer&&(B|=e.STENCIL_BUFFER_BIT)),H){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,ne.__webglColorRenderbuffer[ie]);const Se=i.get(a[ie]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,Se,0)}e.blitFramebuffer(0,0,T,w,0,0,T,w,B,e.NEAREST),b===!0&&(ct.length=0,pt.length=0,ct.push(e.COLOR_ATTACHMENT0+ie),u.depthBuffer&&u.resolveDepthBuffer===!1&&(ct.push(J),pt.push(J),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,pt)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,ct))}if(t.bindFramebuffer(e.READ_FRAMEBUFFER,null),t.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),H)for(let ie=0;ie<a.length;ie++){t.bindFramebuffer(e.FRAMEBUFFER,ne.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ie,e.RENDERBUFFER,ne.__webglColorRenderbuffer[ie]);const Se=i.get(a[ie]).__webglTexture;t.bindFramebuffer(e.FRAMEBUFFER,ne.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+ie,e.TEXTURE_2D,Se,0)}t.bindFramebuffer(e.DRAW_FRAMEBUFFER,ne.__webglMultisampledFramebuffer)}else if(u.depthBuffer&&u.resolveDepthBuffer===!1&&b){const a=u.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[a])}}}function et(u){return Math.min(s.maxSamples,u.samples)}function lt(u){const a=i.get(u);return u.samples>0&&n.has("WEBGL_multisampled_render_to_texture")===!0&&a.__useRenderToTexture!==!1}function E(u){const a=f.render.frame;k.get(u)!==a&&(k.set(u,a),u.update())}function _t(u,a){const T=u.colorSpace,w=u.format,B=u.type;return u.isCompressedTexture===!0||u.isVideoTexture===!0||T!==$a&&T!==$t&&(Je.getTransfer(T)===Ze?(w!==It||B!==Lt)&&Be("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):$e("WebGLTextures: Unsupported texture color space:",T)),a}function Ge(u){return typeof HTMLImageElement<"u"&&u instanceof HTMLImageElement?(M.width=u.naturalWidth||u.width,M.height=u.naturalHeight||u.height):typeof VideoFrame<"u"&&u instanceof VideoFrame?(M.width=u.displayWidth,M.height=u.displayHeight):(M.width=u.width,M.height=u.height),M}this.allocateTextureUnit=Y,this.resetTextureUnits=j,this.getTextureUnits=Z,this.setTextureUnits=W,this.setTexture2D=$,this.setTexture2DArray=ce,this.setTexture3D=ge,this.setTextureCube=ve,this.rebindTextures=Fe,this.setupRenderTarget=ye,this.updateRenderTargetMipmap=st,this.updateMultisampleRenderTarget=ht,this.setupDepthRenderbuffer=We,this.setupFrameBufferTexture=Ae,this.useMultisampledRTT=lt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function xd(e,n){function t(i,s=$t){let r;const f=Je.getTransfer(s);if(i===Lt)return e.UNSIGNED_BYTE;if(i===Na)return e.UNSIGNED_SHORT_4_4_4_4;if(i===ya)return e.UNSIGNED_SHORT_5_5_5_1;if(i===Jr)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===eo)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===to)return e.BYTE;if(i===no)return e.SHORT;if(i===Cn)return e.UNSIGNED_SHORT;if(i===Ba)return e.INT;if(i===Yt)return e.UNSIGNED_INT;if(i===Ht)return e.FLOAT;if(i===kt)return e.HALF_FLOAT;if(i===io)return e.ALPHA;if(i===ao)return e.RGB;if(i===It)return e.RGBA;if(i===nn)return e.DEPTH_COMPONENT;if(i===Qt)return e.DEPTH_STENCIL;if(i===ro)return e.RED;if(i===Ia)return e.RED_INTEGER;if(i===an)return e.RG;if(i===wa)return e.RG_INTEGER;if(i===Ua)return e.RGBA_INTEGER;if(i===On||i===Fn||i===Bn||i===Gn)if(f===Ze)if(r=n.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===On)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Fn)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Bn)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Gn)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=n.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===On)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Fn)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Bn)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Gn)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===vi||i===Si||i===Ei||i===xi)if(r=n.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===vi)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Si)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ei)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===xi)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Mi||i===Ti||i===Ai||i===bi||i===Ri||i===$n||i===Ci)if(r=n.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Mi||i===Ti)return f===Ze?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Ai)return f===Ze?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===bi)return r.COMPRESSED_R11_EAC;if(i===Ri)return r.COMPRESSED_SIGNED_R11_EAC;if(i===$n)return r.COMPRESSED_RG11_EAC;if(i===Ci)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Pi||i===Li||i===Di||i===Ui||i===wi||i===Ii||i===Ni||i===yi||i===Oi||i===Fi||i===Bi||i===Gi||i===Hi||i===Vi)if(r=n.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Pi)return f===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Li)return f===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Di)return f===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ui)return f===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===wi)return f===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ii)return f===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ni)return f===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===yi)return f===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Oi)return f===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Fi)return f===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Bi)return f===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Gi)return f===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Hi)return f===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Vi)return f===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ki||i===Wi||i===zi)if(r=n.get("EXT_texture_compression_bptc"),r!==null){if(i===ki)return f===Ze?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Wi)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===zi)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Xi||i===Yi||i===jn||i===Ki)if(r=n.get("EXT_texture_compression_rgtc"),r!==null){if(i===Xi)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Yi)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===jn)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ki)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===hn?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:t}}const Md=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Td=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Ad{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(n,t){if(this.texture===null){const i=new Oa(n.texture);(n.depthNear!==t.depthNear||n.depthFar!==t.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=i}}getMesh(n){if(this.texture!==null&&this.mesh===null){const t=n.cameras[0].viewport,i=new Ot({vertexShader:Md,fragmentShader:Td,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new yt(new Fa(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class bd extends vr{constructor(n,t){super();const i=this;let s=null,r=1,f=null,m="local-floor",b=1,M=null,k=null,U=null,p=null,S=null,C=null;const G=typeof XRWebGLBinding<"u",d=new Ad,l={},O=t.getContextAttributes();let y=null,h=null;const A=[],g=[],P=new je;let c=null;const _=new Mn;_.viewport=new St;const I=new Mn;I.viewport=new St;const R=[_,I],F=new Sr;let j=null,Z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let te=A[K];return te===void 0&&(te=new Nn,A[K]=te),te.getTargetRaySpace()},this.getControllerGrip=function(K){let te=A[K];return te===void 0&&(te=new Nn,A[K]=te),te.getGripSpace()},this.getHand=function(K){let te=A[K];return te===void 0&&(te=new Nn,A[K]=te),te.getHandSpace()};function W(K){const te=g.indexOf(K.inputSource);if(te===-1)return;const Q=A[te];Q!==void 0&&(Q.update(K.inputSource,K.frame,M||f),Q.dispatchEvent({type:K.type,data:K.inputSource}))}function Y(){s.removeEventListener("select",W),s.removeEventListener("selectstart",W),s.removeEventListener("selectend",W),s.removeEventListener("squeeze",W),s.removeEventListener("squeezestart",W),s.removeEventListener("squeezeend",W),s.removeEventListener("end",Y),s.removeEventListener("inputsourceschange",V);for(let K=0;K<A.length;K++){const te=g[K];te!==null&&(g[K]=null,A[K].disconnect(te))}j=null,Z=null,d.reset();for(const K in l)delete l[K];n.setRenderTarget(y),S=null,p=null,U=null,s=null,h=null,He.stop(),i.isPresenting=!1,n.setPixelRatio(c),n.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,i.isPresenting===!0&&Be("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){m=K,i.isPresenting===!0&&Be("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return M||f},this.setReferenceSpace=function(K){M=K},this.getBaseLayer=function(){return p!==null?p:S},this.getBinding=function(){return U===null&&G&&(U=new XRWebGLBinding(s,t)),U},this.getFrame=function(){return C},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(y=n.getRenderTarget(),s.addEventListener("select",W),s.addEventListener("selectstart",W),s.addEventListener("selectend",W),s.addEventListener("squeeze",W),s.addEventListener("squeezestart",W),s.addEventListener("squeezeend",W),s.addEventListener("end",Y),s.addEventListener("inputsourceschange",V),O.xrCompatible!==!0&&await t.makeXRCompatible(),c=n.getPixelRatio(),n.getSize(P),G&&"createProjectionLayer"in XRWebGLBinding.prototype){let Q=null,Re=null,Pe=null;O.depth&&(Pe=O.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Q=O.stencil?Qt:nn,Re=O.stencil?hn:Yt);const Ae={colorFormat:t.RGBA8,depthFormat:Pe,scaleFactor:r};U=this.getBinding(),p=U.createProjectionLayer(Ae),s.updateRenderState({layers:[p]}),n.setPixelRatio(1),n.setSize(p.textureWidth,p.textureHeight,!1),h=new Ut(p.textureWidth,p.textureHeight,{format:It,type:Lt,depthTexture:new pn(p.textureWidth,p.textureHeight,Re,void 0,void 0,void 0,void 0,void 0,void 0,Q),stencilBuffer:O.stencil,colorSpace:n.outputColorSpace,samples:O.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}else{const Q={antialias:O.antialias,alpha:!0,depth:O.depth,stencil:O.stencil,framebufferScaleFactor:r};S=new XRWebGLLayer(s,t,Q),s.updateRenderState({baseLayer:S}),n.setPixelRatio(1),n.setSize(S.framebufferWidth,S.framebufferHeight,!1),h=new Ut(S.framebufferWidth,S.framebufferHeight,{format:It,type:Lt,colorSpace:n.outputColorSpace,stencilBuffer:O.stencil,resolveDepthBuffer:S.ignoreDepthValues===!1,resolveStencilBuffer:S.ignoreDepthValues===!1})}h.isXRRenderTarget=!0,this.setFoveation(b),M=null,f=await s.requestReferenceSpace(m),He.setContext(s),He.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return d.getDepthTexture()};function V(K){for(let te=0;te<K.removed.length;te++){const Q=K.removed[te],Re=g.indexOf(Q);Re>=0&&(g[Re]=null,A[Re].disconnect(Q))}for(let te=0;te<K.added.length;te++){const Q=K.added[te];let Re=g.indexOf(Q);if(Re===-1){for(let Ae=0;Ae<A.length;Ae++)if(Ae>=g.length){g.push(Q),Re=Ae;break}else if(g[Ae]===null){g[Ae]=Q,Re=Ae;break}if(Re===-1)break}const Pe=A[Re];Pe&&Pe.connect(Q)}}const $=new Ce,ce=new Ce;function ge(K,te,Q){$.setFromMatrixPosition(te.matrixWorld),ce.setFromMatrixPosition(Q.matrixWorld);const Re=$.distanceTo(ce),Pe=te.projectionMatrix.elements,Ae=Q.projectionMatrix.elements,it=Pe[14]/(Pe[10]-1),Ie=Pe[14]/(Pe[10]+1),We=(Pe[9]+1)/Pe[5],Fe=(Pe[9]-1)/Pe[5],ye=(Pe[8]-1)/Pe[0],st=(Ae[8]+1)/Ae[0],ct=it*ye,pt=it*st,ht=Re/(-ye+st),et=ht*-ye;if(te.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(et),K.translateZ(ht),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Pe[10]===-1)K.projectionMatrix.copy(te.projectionMatrix),K.projectionMatrixInverse.copy(te.projectionMatrixInverse);else{const lt=it+ht,E=Ie+ht,_t=ct-et,Ge=pt+(Re-et),u=We*Ie/E*lt,a=Fe*Ie/E*lt;K.projectionMatrix.makePerspective(_t,Ge,u,a,lt,E),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function ve(K,te){te===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(te.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let te=K.near,Q=K.far;d.texture!==null&&(d.depthNear>0&&(te=d.depthNear),d.depthFar>0&&(Q=d.depthFar)),F.near=I.near=_.near=te,F.far=I.far=_.far=Q,(j!==F.near||Z!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),j=F.near,Z=F.far),F.layers.mask=K.layers.mask|6,_.layers.mask=F.layers.mask&-5,I.layers.mask=F.layers.mask&-3;const Re=K.parent,Pe=F.cameras;ve(F,Re);for(let Ae=0;Ae<Pe.length;Ae++)ve(Pe[Ae],Re);Pe.length===2?ge(F,_,I):F.projectionMatrix.copy(_.projectionMatrix),xe(K,F,Re)};function xe(K,te,Q){Q===null?K.matrix.copy(te.matrixWorld):(K.matrix.copy(Q.matrixWorld),K.matrix.invert(),K.matrix.multiply(te.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(te.projectionMatrix),K.projectionMatrixInverse.copy(te.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=Er*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(p===null&&S===null))return b},this.setFoveation=function(K){b=K,p!==null&&(p.fixedFoveation=K),S!==null&&S.fixedFoveation!==void 0&&(S.fixedFoveation=K)},this.hasDepthSensing=function(){return d.texture!==null},this.getDepthSensingMesh=function(){return d.getMesh(F)},this.getCameraTexture=function(K){return l[K]};let Ye=null;function ot(K,te){if(k=te.getViewerPose(M||f),C=te,k!==null){const Q=k.views;S!==null&&(n.setRenderTargetFramebuffer(h,S.framebuffer),n.setRenderTarget(h));let Re=!1;Q.length!==F.cameras.length&&(F.cameras.length=0,Re=!0);for(let Ie=0;Ie<Q.length;Ie++){const We=Q[Ie];let Fe=null;if(S!==null)Fe=S.getViewport(We);else{const st=U.getViewSubImage(p,We);Fe=st.viewport,Ie===0&&(n.setRenderTargetTextures(h,st.colorTexture,st.depthStencilTexture),n.setRenderTarget(h))}let ye=R[Ie];ye===void 0&&(ye=new Mn,ye.layers.enable(Ie),ye.viewport=new St,R[Ie]=ye),ye.matrix.fromArray(We.transform.matrix),ye.matrix.decompose(ye.position,ye.quaternion,ye.scale),ye.projectionMatrix.fromArray(We.projectionMatrix),ye.projectionMatrixInverse.copy(ye.projectionMatrix).invert(),ye.viewport.set(Fe.x,Fe.y,Fe.width,Fe.height),Ie===0&&(F.matrix.copy(ye.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Re===!0&&F.cameras.push(ye)}const Pe=s.enabledFeatures;if(Pe&&Pe.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&G){U=i.getBinding();const Ie=U.getDepthInformation(Q[0]);Ie&&Ie.isValid&&Ie.texture&&d.init(Ie,s.renderState)}if(Pe&&Pe.includes("camera-access")&&G){n.state.unbindTexture(),U=i.getBinding();for(let Ie=0;Ie<Q.length;Ie++){const We=Q[Ie].camera;if(We){let Fe=l[We];Fe||(Fe=new Oa,l[We]=Fe);const ye=U.getCameraImage(We);Fe.sourceTexture=ye}}}}for(let Q=0;Q<A.length;Q++){const Re=g[Q],Pe=A[Q];Re!==null&&Pe!==void 0&&Pe.update(Re,te,M||f)}Ye&&Ye(K,te),te.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:te}),C=null}const He=new ja;He.setAnimationLoop(ot),this.setAnimationLoop=function(K){Ye=K},this.dispose=function(){}}}const Rd=new tn,ar=new Ne;ar.set(-1,0,0,0,1,0,0,0,1);function Cd(e,n){function t(d,l){d.matrixAutoUpdate===!0&&d.updateMatrix(),l.value.copy(d.matrix)}function i(d,l){l.color.getRGB(d.fogColor.value,Ha(e)),l.isFog?(d.fogNear.value=l.near,d.fogFar.value=l.far):l.isFogExp2&&(d.fogDensity.value=l.density)}function s(d,l,O,y,h){l.isNodeMaterial?l.uniformsNeedUpdate=!1:l.isMeshBasicMaterial?r(d,l):l.isMeshLambertMaterial?(r(d,l),l.envMap&&(d.envMapIntensity.value=l.envMapIntensity)):l.isMeshToonMaterial?(r(d,l),U(d,l)):l.isMeshPhongMaterial?(r(d,l),k(d,l),l.envMap&&(d.envMapIntensity.value=l.envMapIntensity)):l.isMeshStandardMaterial?(r(d,l),p(d,l),l.isMeshPhysicalMaterial&&S(d,l,h)):l.isMeshMatcapMaterial?(r(d,l),C(d,l)):l.isMeshDepthMaterial?r(d,l):l.isMeshDistanceMaterial?(r(d,l),G(d,l)):l.isMeshNormalMaterial?r(d,l):l.isLineBasicMaterial?(f(d,l),l.isLineDashedMaterial&&m(d,l)):l.isPointsMaterial?b(d,l,O,y):l.isSpriteMaterial?M(d,l):l.isShadowMaterial?(d.color.value.copy(l.color),d.opacity.value=l.opacity):l.isShaderMaterial&&(l.uniformsNeedUpdate=!1)}function r(d,l){d.opacity.value=l.opacity,l.color&&d.diffuse.value.copy(l.color),l.emissive&&d.emissive.value.copy(l.emissive).multiplyScalar(l.emissiveIntensity),l.map&&(d.map.value=l.map,t(l.map,d.mapTransform)),l.alphaMap&&(d.alphaMap.value=l.alphaMap,t(l.alphaMap,d.alphaMapTransform)),l.bumpMap&&(d.bumpMap.value=l.bumpMap,t(l.bumpMap,d.bumpMapTransform),d.bumpScale.value=l.bumpScale,l.side===Mt&&(d.bumpScale.value*=-1)),l.normalMap&&(d.normalMap.value=l.normalMap,t(l.normalMap,d.normalMapTransform),d.normalScale.value.copy(l.normalScale),l.side===Mt&&d.normalScale.value.negate()),l.displacementMap&&(d.displacementMap.value=l.displacementMap,t(l.displacementMap,d.displacementMapTransform),d.displacementScale.value=l.displacementScale,d.displacementBias.value=l.displacementBias),l.emissiveMap&&(d.emissiveMap.value=l.emissiveMap,t(l.emissiveMap,d.emissiveMapTransform)),l.specularMap&&(d.specularMap.value=l.specularMap,t(l.specularMap,d.specularMapTransform)),l.alphaTest>0&&(d.alphaTest.value=l.alphaTest);const O=n.get(l),y=O.envMap,h=O.envMapRotation;y&&(d.envMap.value=y,d.envMapRotation.value.setFromMatrix4(Rd.makeRotationFromEuler(h)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&d.envMapRotation.value.premultiply(ar),d.reflectivity.value=l.reflectivity,d.ior.value=l.ior,d.refractionRatio.value=l.refractionRatio),l.lightMap&&(d.lightMap.value=l.lightMap,d.lightMapIntensity.value=l.lightMapIntensity,t(l.lightMap,d.lightMapTransform)),l.aoMap&&(d.aoMap.value=l.aoMap,d.aoMapIntensity.value=l.aoMapIntensity,t(l.aoMap,d.aoMapTransform))}function f(d,l){d.diffuse.value.copy(l.color),d.opacity.value=l.opacity,l.map&&(d.map.value=l.map,t(l.map,d.mapTransform))}function m(d,l){d.dashSize.value=l.dashSize,d.totalSize.value=l.dashSize+l.gapSize,d.scale.value=l.scale}function b(d,l,O,y){d.diffuse.value.copy(l.color),d.opacity.value=l.opacity,d.size.value=l.size*O,d.scale.value=y*.5,l.map&&(d.map.value=l.map,t(l.map,d.uvTransform)),l.alphaMap&&(d.alphaMap.value=l.alphaMap,t(l.alphaMap,d.alphaMapTransform)),l.alphaTest>0&&(d.alphaTest.value=l.alphaTest)}function M(d,l){d.diffuse.value.copy(l.color),d.opacity.value=l.opacity,d.rotation.value=l.rotation,l.map&&(d.map.value=l.map,t(l.map,d.mapTransform)),l.alphaMap&&(d.alphaMap.value=l.alphaMap,t(l.alphaMap,d.alphaMapTransform)),l.alphaTest>0&&(d.alphaTest.value=l.alphaTest)}function k(d,l){d.specular.value.copy(l.specular),d.shininess.value=Math.max(l.shininess,1e-4)}function U(d,l){l.gradientMap&&(d.gradientMap.value=l.gradientMap)}function p(d,l){d.metalness.value=l.metalness,l.metalnessMap&&(d.metalnessMap.value=l.metalnessMap,t(l.metalnessMap,d.metalnessMapTransform)),d.roughness.value=l.roughness,l.roughnessMap&&(d.roughnessMap.value=l.roughnessMap,t(l.roughnessMap,d.roughnessMapTransform)),l.envMap&&(d.envMapIntensity.value=l.envMapIntensity)}function S(d,l,O){d.ior.value=l.ior,l.sheen>0&&(d.sheenColor.value.copy(l.sheenColor).multiplyScalar(l.sheen),d.sheenRoughness.value=l.sheenRoughness,l.sheenColorMap&&(d.sheenColorMap.value=l.sheenColorMap,t(l.sheenColorMap,d.sheenColorMapTransform)),l.sheenRoughnessMap&&(d.sheenRoughnessMap.value=l.sheenRoughnessMap,t(l.sheenRoughnessMap,d.sheenRoughnessMapTransform))),l.clearcoat>0&&(d.clearcoat.value=l.clearcoat,d.clearcoatRoughness.value=l.clearcoatRoughness,l.clearcoatMap&&(d.clearcoatMap.value=l.clearcoatMap,t(l.clearcoatMap,d.clearcoatMapTransform)),l.clearcoatRoughnessMap&&(d.clearcoatRoughnessMap.value=l.clearcoatRoughnessMap,t(l.clearcoatRoughnessMap,d.clearcoatRoughnessMapTransform)),l.clearcoatNormalMap&&(d.clearcoatNormalMap.value=l.clearcoatNormalMap,t(l.clearcoatNormalMap,d.clearcoatNormalMapTransform),d.clearcoatNormalScale.value.copy(l.clearcoatNormalScale),l.side===Mt&&d.clearcoatNormalScale.value.negate())),l.dispersion>0&&(d.dispersion.value=l.dispersion),l.iridescence>0&&(d.iridescence.value=l.iridescence,d.iridescenceIOR.value=l.iridescenceIOR,d.iridescenceThicknessMinimum.value=l.iridescenceThicknessRange[0],d.iridescenceThicknessMaximum.value=l.iridescenceThicknessRange[1],l.iridescenceMap&&(d.iridescenceMap.value=l.iridescenceMap,t(l.iridescenceMap,d.iridescenceMapTransform)),l.iridescenceThicknessMap&&(d.iridescenceThicknessMap.value=l.iridescenceThicknessMap,t(l.iridescenceThicknessMap,d.iridescenceThicknessMapTransform))),l.transmission>0&&(d.transmission.value=l.transmission,d.transmissionSamplerMap.value=O.texture,d.transmissionSamplerSize.value.set(O.width,O.height),l.transmissionMap&&(d.transmissionMap.value=l.transmissionMap,t(l.transmissionMap,d.transmissionMapTransform)),d.thickness.value=l.thickness,l.thicknessMap&&(d.thicknessMap.value=l.thicknessMap,t(l.thicknessMap,d.thicknessMapTransform)),d.attenuationDistance.value=l.attenuationDistance,d.attenuationColor.value.copy(l.attenuationColor)),l.anisotropy>0&&(d.anisotropyVector.value.set(l.anisotropy*Math.cos(l.anisotropyRotation),l.anisotropy*Math.sin(l.anisotropyRotation)),l.anisotropyMap&&(d.anisotropyMap.value=l.anisotropyMap,t(l.anisotropyMap,d.anisotropyMapTransform))),d.specularIntensity.value=l.specularIntensity,d.specularColor.value.copy(l.specularColor),l.specularColorMap&&(d.specularColorMap.value=l.specularColorMap,t(l.specularColorMap,d.specularColorMapTransform)),l.specularIntensityMap&&(d.specularIntensityMap.value=l.specularIntensityMap,t(l.specularIntensityMap,d.specularIntensityMapTransform))}function C(d,l){l.matcap&&(d.matcap.value=l.matcap)}function G(d,l){const O=n.get(l).light;d.referencePosition.value.setFromMatrixPosition(O.matrixWorld),d.nearDistance.value=O.shadow.camera.near,d.farDistance.value=O.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Pd(e,n,t,i){let s={},r={},f=[];const m=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function b(h,A){const g=A.program;i.uniformBlockBinding(h,g)}function M(h,A){let g=s[h.id];g===void 0&&(d(h),g=k(h),s[h.id]=g,h.addEventListener("dispose",O));const P=A.program;i.updateUBOMapping(h,P);const c=n.render.frame;r[h.id]!==c&&(p(h),r[h.id]=c)}function k(h){const A=U();h.__bindingPointIndex=A;const g=e.createBuffer(),P=h.__size,c=h.usage;return e.bindBuffer(e.UNIFORM_BUFFER,g),e.bufferData(e.UNIFORM_BUFFER,P,c),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,A,g),g}function U(){for(let h=0;h<m;h++)if(f.indexOf(h)===-1)return f.push(h),h;return $e("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(h){const A=s[h.id],g=h.uniforms,P=h.__cache;e.bindBuffer(e.UNIFORM_BUFFER,A);for(let c=0,_=g.length;c<_;c++){const I=g[c];if(Array.isArray(I))for(let R=0,F=I.length;R<F;R++)S(I[R],c,R,P);else S(I,c,0,P)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function S(h,A,g,P){if(G(h,A,g,P)===!0){const c=h.__offset,_=h.value;if(Array.isArray(_)){let I=0;for(let R=0;R<_.length;R++){const F=_[R],j=l(F);C(F,h.__data,I),typeof F!="number"&&typeof F!="boolean"&&!F.isMatrix3&&!ArrayBuffer.isView(F)&&(I+=j.storage/Float32Array.BYTES_PER_ELEMENT)}}else C(_,h.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,c,h.__data)}}function C(h,A,g){typeof h=="number"||typeof h=="boolean"?A[0]=h:h.isMatrix3?(A[0]=h.elements[0],A[1]=h.elements[1],A[2]=h.elements[2],A[3]=0,A[4]=h.elements[3],A[5]=h.elements[4],A[6]=h.elements[5],A[7]=0,A[8]=h.elements[6],A[9]=h.elements[7],A[10]=h.elements[8],A[11]=0):ArrayBuffer.isView(h)?A.set(new h.constructor(h.buffer,h.byteOffset,A.length)):h.toArray(A,g)}function G(h,A,g,P){const c=h.value,_=A+"_"+g;if(P[_]===void 0)return typeof c=="number"||typeof c=="boolean"?P[_]=c:ArrayBuffer.isView(c)?P[_]=c.slice():P[_]=c.clone(),!0;{const I=P[_];if(typeof c=="number"||typeof c=="boolean"){if(I!==c)return P[_]=c,!0}else{if(ArrayBuffer.isView(c))return!0;if(I.equals(c)===!1)return I.copy(c),!0}}return!1}function d(h){const A=h.uniforms;let g=0;const P=16;for(let _=0,I=A.length;_<I;_++){const R=Array.isArray(A[_])?A[_]:[A[_]];for(let F=0,j=R.length;F<j;F++){const Z=R[F],W=Array.isArray(Z.value)?Z.value:[Z.value];for(let Y=0,V=W.length;Y<V;Y++){const $=W[Y],ce=l($),ge=g%P,ve=ge%ce.boundary,xe=ge+ve;g+=ve,xe!==0&&P-xe<ce.storage&&(g+=P-xe),Z.__data=new Float32Array(ce.storage/Float32Array.BYTES_PER_ELEMENT),Z.__offset=g,g+=ce.storage}}}const c=g%P;return c>0&&(g+=P-c),h.__size=g,h.__cache={},this}function l(h){const A={boundary:0,storage:0};return typeof h=="number"||typeof h=="boolean"?(A.boundary=4,A.storage=4):h.isVector2?(A.boundary=8,A.storage=8):h.isVector3||h.isColor?(A.boundary=16,A.storage=12):h.isVector4?(A.boundary=16,A.storage=16):h.isMatrix3?(A.boundary=48,A.storage=48):h.isMatrix4?(A.boundary=64,A.storage=64):h.isTexture?Be("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(h)?(A.boundary=16,A.storage=h.byteLength):Be("WebGLRenderer: Unsupported uniform value type.",h),A}function O(h){const A=h.target;A.removeEventListener("dispose",O);const g=f.indexOf(A.__bindingPointIndex);f.splice(g,1),e.deleteBuffer(s[A.id]),delete s[A.id],delete r[A.id]}function y(){for(const h in s)e.deleteBuffer(s[h]);f=[],s={},r={}}return{bind:b,update:M,dispose:y}}const Ld=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Ct=null;function Dd(){return Ct===null&&(Ct=new xr(Ld,16,16,an,kt),Ct.name="DFG_LUT",Ct.minFilter=xt,Ct.magFilter=xt,Ct.wrapS=Zn,Ct.wrapT=Zn,Ct.generateMipmaps=!1,Ct.needsUpdate=!0),Ct}class Xd{constructor(n={}){const{canvas:t=pr(),context:i=null,depth:s=!0,stencil:r=!1,alpha:f=!1,antialias:m=!1,premultipliedAlpha:b=!0,preserveDrawingBuffer:M=!1,powerPreference:k="default",failIfMajorPerformanceCaveat:U=!1,reversedDepthBuffer:p=!1,outputBufferType:S=Lt}=n;this.isWebGLRenderer=!0;let C;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");C=i.getContextAttributes().alpha}else C=f;const G=S,d=new Set([Ua,wa,Ia]),l=new Set([Lt,Yt,Cn,hn,Na,ya]),O=new Uint32Array(4),y=new Int32Array(4),h=new Ce;let A=null,g=null;const P=[],c=[];let _=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Dt,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const I=this;let R=!1,F=null,j=null,Z=null,W=null;this._outputColorSpace=hr;let Y=0,V=0,$=null,ce=-1,ge=null;const ve=new St,xe=new St;let Ye=null;const ot=new Qe(0);let He=0,K=t.width,te=t.height,Q=1,Re=null,Pe=null;const Ae=new St(0,0,K,te),it=new St(0,0,K,te);let Ie=!1;const We=new Pa;let Fe=!1,ye=!1;const st=new tn,ct=new Ce,pt=new St,ht={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let et=!1;function lt(){return $===null?Q:1}let E=i;function _t(o,x){return t.getContext(o,x)}try{const o={alpha:!0,depth:s,stencil:r,antialias:m,premultipliedAlpha:b,preserveDrawingBuffer:M,powerPreference:k,failIfMajorPerformanceCaveat:U};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${mr}`),t.addEventListener("webglcontextlost",tt,!1),t.addEventListener("webglcontextrestored",Ke,!1),t.addEventListener("webglcontextcreationerror",At,!1),E===null){const x="webgl2";if(E=_t(x,o),E===null)throw _t(x)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(o){throw $e("WebGLRenderer: "+o.message),o}let Ge,u,a,T,w,B,J,ne,H,X,ie,Se,oe,ae,Te,be,Le,v,ee,z,re,de,q;function _e(){Ge=new Lc(E),Ge.init(),re=new xd(E,Ge),u=new xc(E,Ge,n,re),a=new Sd(E,Ge),u.reversedDepthBuffer&&p&&a.buffers.depth.setReversed(!0),j=E.createFramebuffer(),Z=E.createFramebuffer(),W=E.createFramebuffer(),T=new wc(E),w=new rd,B=new Ed(E,Ge,a,w,u,re,T),J=new Pc(I),ne=new Oo(E),de=new Sc(E,ne),H=new Dc(E,ne,T,de),X=new Nc(E,H,ne,de,T),v=new Ic(E,u,B),Te=new Mc(w),ie=new ad(I,J,Ge,u,de,Te),Se=new Cd(I,w),oe=new sd,ae=new pd(Ge),Le=new vc(I,J,a,X,C,b),be=new vd(I,X,u),q=new Pd(E,T,u,a),ee=new Ec(E,Ge,T),z=new Uc(E,Ge,T),T.programs=ie.programs,I.capabilities=u,I.extensions=Ge,I.properties=w,I.renderLists=oe,I.shadowMap=be,I.state=a,I.info=T}_e(),G!==Lt&&(_=new Oc(G,t.width,t.height,m,s,r));const he=new bd(I,E);this.xr=he,this.getContext=function(){return E},this.getContextAttributes=function(){return E.getContextAttributes()},this.forceContextLoss=function(){const o=Ge.get("WEBGL_lose_context");o&&o.loseContext()},this.forceContextRestore=function(){const o=Ge.get("WEBGL_lose_context");o&&o.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(o){o!==void 0&&(Q=o,this.setSize(K,te,!1))},this.getSize=function(o){return o.set(K,te)},this.setSize=function(o,x,N=!0){if(he.isPresenting){Be("WebGLRenderer: Can't change size while VR device is presenting.");return}K=o,te=x,t.width=Math.floor(o*Q),t.height=Math.floor(x*Q),N===!0&&(t.style.width=o+"px",t.style.height=x+"px"),_!==null&&_.setSize(t.width,t.height),this.setViewport(0,0,o,x)},this.getDrawingBufferSize=function(o){return o.set(K*Q,te*Q).floor()},this.setDrawingBufferSize=function(o,x,N){K=o,te=x,Q=N,t.width=Math.floor(o*N),t.height=Math.floor(x*N),this.setViewport(0,0,o,x)},this.setEffects=function(o){if(G===Lt){$e("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(o){for(let x=0;x<o.length;x++)if(o[x].isOutputPass===!0){Be("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}_.setEffects(o||[])},this.getCurrentViewport=function(o){return o.copy(ve)},this.getViewport=function(o){return o.copy(Ae)},this.setViewport=function(o,x,N,L){o.isVector4?Ae.set(o.x,o.y,o.z,o.w):Ae.set(o,x,N,L),a.viewport(ve.copy(Ae).multiplyScalar(Q).round())},this.getScissor=function(o){return o.copy(it)},this.setScissor=function(o,x,N,L){o.isVector4?it.set(o.x,o.y,o.z,o.w):it.set(o,x,N,L),a.scissor(xe.copy(it).multiplyScalar(Q).round())},this.getScissorTest=function(){return Ie},this.setScissorTest=function(o){a.setScissorTest(Ie=o)},this.setOpaqueSort=function(o){Re=o},this.setTransparentSort=function(o){Pe=o},this.getClearColor=function(o){return o.copy(Le.getClearColor())},this.setClearColor=function(){Le.setClearColor(...arguments)},this.getClearAlpha=function(){return Le.getClearAlpha()},this.setClearAlpha=function(){Le.setClearAlpha(...arguments)},this.clear=function(o=!0,x=!0,N=!0){let L=0;if(o){let D=!1;if($!==null){const fe=$.texture.format;D=d.has(fe)}if(D){const fe=$.texture.type,pe=l.has(fe),le=Le.getClearColor(),me=Le.getClearAlpha(),Ee=le.r,De=le.g,we=le.b;pe?(O[0]=Ee,O[1]=De,O[2]=we,O[3]=me,E.clearBufferuiv(E.COLOR,0,O)):(y[0]=Ee,y[1]=De,y[2]=we,y[3]=me,E.clearBufferiv(E.COLOR,0,y))}else L|=E.COLOR_BUFFER_BIT}x&&(L|=E.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),N&&(L|=E.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L!==0&&E.clear(L)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(o){o.setRenderer(this),F=o},this.dispose=function(){t.removeEventListener("webglcontextlost",tt,!1),t.removeEventListener("webglcontextrestored",Ke,!1),t.removeEventListener("webglcontextcreationerror",At,!1),Le.dispose(),oe.dispose(),ae.dispose(),w.dispose(),J.dispose(),X.dispose(),de.dispose(),q.dispose(),ie.dispose(),he.dispose(),he.removeEventListener("sessionstart",oi),he.removeEventListener("sessionend",si),Wt.stop()};function tt(o){o.preventDefault(),hi("WebGLRenderer: Context Lost."),R=!0}function Ke(){hi("WebGLRenderer: Context Restored."),R=!1;const o=T.autoReset,x=be.enabled,N=be.autoUpdate,L=be.needsUpdate,D=be.type;_e(),T.autoReset=o,be.enabled=x,be.autoUpdate=N,be.needsUpdate=L,be.type=D}function At(o){$e("WebGLRenderer: A WebGL context could not be created. Reason: ",o.statusMessage)}function bt(o){const x=o.target;x.removeEventListener("dispose",bt),or(x)}function or(o){sr(o),w.remove(o)}function sr(o){const x=w.get(o).programs;x!==void 0&&(x.forEach(function(N){ie.releaseProgram(N)}),o.isShaderMaterial&&ie.releaseShaderCache(o))}this.renderBufferDirect=function(o,x,N,L,D,fe){x===null&&(x=ht);const pe=D.isMesh&&D.matrixWorld.determinantAffine()<0,le=fr(o,x,N,L,D);a.setMaterial(L,pe);let me=N.index,Ee=1;if(L.wireframe===!0){if(me=H.getWireframeAttribute(N),me===void 0)return;Ee=2}const De=N.drawRange,we=N.attributes.position;let Me=De.start*Ee,Ve=(De.start+De.count)*Ee;fe!==null&&(Me=Math.max(Me,fe.start*Ee),Ve=Math.min(Ve,(fe.start+fe.count)*Ee)),me!==null?(Me=Math.max(Me,0),Ve=Math.min(Ve,me.count)):we!=null&&(Me=Math.max(Me,0),Ve=Math.min(Ve,we.count));const at=Ve-Me;if(at<0||at===1/0)return;de.setup(D,L,le,N,me);let nt,ze=ee;if(me!==null&&(nt=ne.get(me),ze=z,ze.setIndex(nt)),D.isMesh)L.wireframe===!0?(a.setLineWidth(L.wireframeLinewidth*lt()),ze.setMode(E.LINES)):ze.setMode(E.TRIANGLES);else if(D.isLine){let mt=L.linewidth;mt===void 0&&(mt=1),a.setLineWidth(mt*lt()),D.isLineSegments?ze.setMode(E.LINES):D.isLineLoop?ze.setMode(E.LINE_LOOP):ze.setMode(E.LINE_STRIP)}else D.isPoints?ze.setMode(E.POINTS):D.isSprite&&ze.setMode(E.TRIANGLES);if(D.isBatchedMesh)if(Ge.get("WEBGL_multi_draw"))ze.renderMultiDraw(D._multiDrawStarts,D._multiDrawCounts,D._multiDrawCount);else{const mt=D._multiDrawStarts,ue=D._multiDrawCounts,Et=D._multiDrawCount,Oe=me?ne.get(me).bytesPerElement:1,Tt=w.get(L).currentProgram.getUniforms();for(let Rt=0;Rt<Et;Rt++)Tt.setValue(E,"_gl_DrawID",Rt),ze.render(mt[Rt]/Oe,ue[Rt])}else if(D.isInstancedMesh)ze.renderInstances(Me,at,D.count);else if(N.isInstancedBufferGeometry){const mt=N._maxInstanceCount!==void 0?N._maxInstanceCount:1/0,ue=Math.min(N.instanceCount,mt);ze.renderInstances(Me,at,ue)}else ze.render(Me,at)};function ri(o,x,N){o.transparent===!0&&o.side===wt&&o.forceSinglePass===!1?(o.side=Mt,o.needsUpdate=!0,gn(o,x,N),o.side=un,o.needsUpdate=!0,gn(o,x,N),o.side=wt):gn(o,x,N)}this.compile=function(o,x,N=null){N===null&&(N=o),g=ae.get(N),g.init(x),c.push(g),N.traverseVisible(function(D){D.isLight&&D.layers.test(x.layers)&&(g.pushLight(D),D.castShadow&&g.pushShadow(D))}),o!==N&&o.traverseVisible(function(D){D.isLight&&D.layers.test(x.layers)&&(g.pushLight(D),D.castShadow&&g.pushShadow(D))}),g.setupLights();const L=new Set;return o.traverse(function(D){if(!(D.isMesh||D.isPoints||D.isLine||D.isSprite))return;const fe=D.material;if(fe)if(Array.isArray(fe))for(let pe=0;pe<fe.length;pe++){const le=fe[pe];ri(le,N,D),L.add(le)}else ri(fe,N,D),L.add(fe)}),g=c.pop(),L},this.compileAsync=function(o,x,N=null){const L=this.compile(o,x,N);return new Promise(D=>{function fe(){if(L.forEach(function(pe){w.get(pe).currentProgram.isReady()&&L.delete(pe)}),L.size===0){D(o);return}setTimeout(fe,10)}Ge.get("KHR_parallel_shader_compile")!==null?fe():setTimeout(fe,10)})};let wn=null;function lr(o){wn&&wn(o)}function oi(){Wt.stop()}function si(){Wt.start()}const Wt=new ja;Wt.setAnimationLoop(lr),typeof self<"u"&&Wt.setContext(self),this.setAnimationLoop=function(o){wn=o,he.setAnimationLoop(o),o===null?Wt.stop():Wt.start()},he.addEventListener("sessionstart",oi),he.addEventListener("sessionend",si),this.render=function(o,x){if(x!==void 0&&x.isCamera!==!0){$e("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;F!==null&&F.renderStart(o,x);const N=he.enabled===!0&&he.isPresenting===!0,L=_!==null&&($===null||N)&&_.begin(I,$);if(o.matrixWorldAutoUpdate===!0&&o.updateMatrixWorld(),x.parent===null&&x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),he.enabled===!0&&he.isPresenting===!0&&(_===null||_.isCompositing()===!1)&&(he.cameraAutoUpdate===!0&&he.updateCamera(x),x=he.getCamera()),o.isScene===!0&&o.onBeforeRender(I,o,x,$),g=ae.get(o,c.length),g.init(x),g.state.textureUnits=B.getTextureUnits(),c.push(g),st.multiplyMatrices(x.projectionMatrix,x.matrixWorldInverse),We.setFromProjectionMatrix(st,mi,x.reversedDepth),ye=this.localClippingEnabled,Fe=Te.init(this.clippingPlanes,ye),A=oe.get(o,P.length),A.init(),P.push(A),he.enabled===!0&&he.isPresenting===!0){const pe=I.xr.getDepthSensingMesh();pe!==null&&In(pe,x,-1/0,I.sortObjects)}In(o,x,0,I.sortObjects),A.finish(),I.sortObjects===!0&&A.sort(Re,Pe,x.reversedDepth),et=he.enabled===!1||he.isPresenting===!1||he.hasDepthSensing()===!1,et&&Le.addToRenderList(A,o),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Fe===!0&&Te.beginShadows();const D=g.state.shadowsArray;if(be.render(D,o,x),Fe===!0&&Te.endShadows(),(L&&_.hasRenderPass())===!1){const pe=A.opaque,le=A.transmissive;if(g.setupLights(),x.isArrayCamera){const me=x.cameras;if(le.length>0)for(let Ee=0,De=me.length;Ee<De;Ee++){const we=me[Ee];ci(pe,le,o,we)}et&&Le.render(o);for(let Ee=0,De=me.length;Ee<De;Ee++){const we=me[Ee];li(A,o,we,we.viewport)}}else le.length>0&&ci(pe,le,o,x),et&&Le.render(o),li(A,o,x)}$!==null&&V===0&&(B.updateMultisampleRenderTarget($),B.updateRenderTargetMipmap($)),L&&_.end(I),o.isScene===!0&&o.onAfterRender(I,o,x),de.resetDefaultState(),ce=-1,ge=null,c.pop(),c.length>0?(g=c[c.length-1],B.setTextureUnits(g.state.textureUnits),Fe===!0&&Te.setGlobalState(I.clippingPlanes,g.state.camera)):g=null,P.pop(),P.length>0?A=P[P.length-1]:A=null,F!==null&&F.renderEnd()};function In(o,x,N,L){if(o.visible===!1)return;if(o.layers.test(x.layers)){if(o.isGroup)N=o.renderOrder;else if(o.isLOD)o.autoUpdate===!0&&o.update(x);else if(o.isLightProbeGrid)g.pushLightProbeGrid(o);else if(o.isLight)g.pushLight(o),o.castShadow&&g.pushShadow(o);else if(o.isSprite){if(!o.frustumCulled||We.intersectsSprite(o)){L&&pt.setFromMatrixPosition(o.matrixWorld).applyMatrix4(st);const pe=X.update(o),le=o.material;le.visible&&A.push(o,pe,le,N,pt.z,null)}}else if((o.isMesh||o.isLine||o.isPoints)&&(!o.frustumCulled||We.intersectsObject(o))){const pe=X.update(o),le=o.material;if(L&&(o.boundingSphere!==void 0?(o.boundingSphere===null&&o.computeBoundingSphere(),pt.copy(o.boundingSphere.center)):(pe.boundingSphere===null&&pe.computeBoundingSphere(),pt.copy(pe.boundingSphere.center)),pt.applyMatrix4(o.matrixWorld).applyMatrix4(st)),Array.isArray(le)){const me=pe.groups;for(let Ee=0,De=me.length;Ee<De;Ee++){const we=me[Ee],Me=le[we.materialIndex];Me&&Me.visible&&A.push(o,pe,Me,N,pt.z,we)}}else le.visible&&A.push(o,pe,le,N,pt.z,null)}}const fe=o.children;for(let pe=0,le=fe.length;pe<le;pe++)In(fe[pe],x,N,L)}function li(o,x,N,L){const{opaque:D,transmissive:fe,transparent:pe}=o;g.setupLightsView(N),Fe===!0&&Te.setGlobalState(I.clippingPlanes,N),L&&a.viewport(ve.copy(L)),D.length>0&&_n(D,x,N),fe.length>0&&_n(fe,x,N),pe.length>0&&_n(pe,x,N),a.buffers.depth.setTest(!0),a.buffers.depth.setMask(!0),a.buffers.color.setMask(!0),a.setPolygonOffset(!1)}function ci(o,x,N,L){if((N.isScene===!0?N.overrideMaterial:null)!==null)return;if(g.state.transmissionRenderTarget[L.id]===void 0){const Me=Ge.has("EXT_color_buffer_half_float")||Ge.has("EXT_color_buffer_float");g.state.transmissionRenderTarget[L.id]=new Ut(1,1,{generateMipmaps:!0,type:Me?kt:Lt,minFilter:jt,samples:Math.max(4,u.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Je.workingColorSpace})}const fe=g.state.transmissionRenderTarget[L.id],pe=L.viewport||ve;fe.setSize(pe.z*I.transmissionResolutionScale,pe.w*I.transmissionResolutionScale);const le=I.getRenderTarget(),me=I.getActiveCubeFace(),Ee=I.getActiveMipmapLevel();I.setRenderTarget(fe),I.getClearColor(ot),He=I.getClearAlpha(),He<1&&I.setClearColor(16777215,.5),I.clear(),et&&Le.render(N);const De=I.toneMapping;I.toneMapping=Dt;const we=L.viewport;if(L.viewport!==void 0&&(L.viewport=void 0),g.setupLightsView(L),Fe===!0&&Te.setGlobalState(I.clippingPlanes,L),_n(o,N,L),B.updateMultisampleRenderTarget(fe),B.updateRenderTargetMipmap(fe),Ge.has("WEBGL_multisampled_render_to_texture")===!1){let Me=!1;for(let Ve=0,at=x.length;Ve<at;Ve++){const nt=x[Ve],{object:ze,geometry:mt,material:ue,group:Et}=nt;if(ue.side===wt&&ze.layers.test(L.layers)){const Oe=ue.side;ue.side=Mt,ue.needsUpdate=!0,fi(ze,N,L,mt,ue,Et),ue.side=Oe,ue.needsUpdate=!0,Me=!0}}Me===!0&&(B.updateMultisampleRenderTarget(fe),B.updateRenderTargetMipmap(fe))}I.setRenderTarget(le,me,Ee),I.setClearColor(ot,He),we!==void 0&&(L.viewport=we),I.toneMapping=De}function _n(o,x,N){const L=x.isScene===!0?x.overrideMaterial:null;for(let D=0,fe=o.length;D<fe;D++){const pe=o[D],{object:le,geometry:me,group:Ee}=pe;let De=pe.material;De.allowOverride===!0&&L!==null&&(De=L),le.layers.test(N.layers)&&fi(le,x,N,me,De,Ee)}}function fi(o,x,N,L,D,fe){o.onBeforeRender(I,x,N,L,D,fe),o.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,o.matrixWorld),o.normalMatrix.getNormalMatrix(o.modelViewMatrix),D.onBeforeRender(I,x,N,L,o,fe),D.transparent===!0&&D.side===wt&&D.forceSinglePass===!1?(D.side=Mt,D.needsUpdate=!0,I.renderBufferDirect(N,x,L,D,o,fe),D.side=un,D.needsUpdate=!0,I.renderBufferDirect(N,x,L,D,o,fe),D.side=wt):I.renderBufferDirect(N,x,L,D,o,fe),o.onAfterRender(I,x,N,L,D,fe)}function gn(o,x,N){x.isScene!==!0&&(x=ht);const L=w.get(o),D=g.state.lights,fe=g.state.shadowsArray,pe=D.state.version,le=ie.getParameters(o,D.state,fe,x,N,g.state.lightProbeGridArray),me=ie.getProgramCacheKey(le);let Ee=L.programs;L.environment=o.isMeshStandardMaterial||o.isMeshLambertMaterial||o.isMeshPhongMaterial?x.environment:null,L.fog=x.fog;const De=o.isMeshStandardMaterial||o.isMeshLambertMaterial&&!o.envMap||o.isMeshPhongMaterial&&!o.envMap;L.envMap=J.get(o.envMap||L.environment,De),L.envMapRotation=L.environment!==null&&o.envMap===null?x.environmentRotation:o.envMapRotation,Ee===void 0&&(o.addEventListener("dispose",bt),Ee=new Map,L.programs=Ee);let we=Ee.get(me);if(we!==void 0){if(L.currentProgram===we&&L.lightsStateVersion===pe)return ui(o,le),we}else le.uniforms=ie.getUniforms(o),F!==null&&o.isNodeMaterial&&F.build(o,N,le),o.onBeforeCompile(le,I),we=ie.acquireProgram(le,me),Ee.set(me,we),L.uniforms=le.uniforms;const Me=L.uniforms;return(!o.isShaderMaterial&&!o.isRawShaderMaterial||o.clipping===!0)&&(Me.clippingPlanes=Te.uniform),ui(o,le),L.needsLights=ur(o),L.lightsStateVersion=pe,L.needsLights&&(Me.ambientLightColor.value=D.state.ambient,Me.lightProbe.value=D.state.probe,Me.directionalLights.value=D.state.directional,Me.directionalLightShadows.value=D.state.directionalShadow,Me.spotLights.value=D.state.spot,Me.spotLightShadows.value=D.state.spotShadow,Me.rectAreaLights.value=D.state.rectArea,Me.ltc_1.value=D.state.rectAreaLTC1,Me.ltc_2.value=D.state.rectAreaLTC2,Me.pointLights.value=D.state.point,Me.pointLightShadows.value=D.state.pointShadow,Me.hemisphereLights.value=D.state.hemi,Me.directionalShadowMatrix.value=D.state.directionalShadowMatrix,Me.spotLightMatrix.value=D.state.spotLightMatrix,Me.spotLightMap.value=D.state.spotLightMap,Me.pointShadowMatrix.value=D.state.pointShadowMatrix),L.lightProbeGrid=g.state.lightProbeGridArray.length>0,L.currentProgram=we,L.uniformsList=null,we}function di(o){if(o.uniformsList===null){const x=o.currentProgram.getUniforms();o.uniformsList=Rn.seqWithValue(x.seq,o.uniforms)}return o.uniformsList}function ui(o,x){const N=w.get(o);N.outputColorSpace=x.outputColorSpace,N.batching=x.batching,N.batchingColor=x.batchingColor,N.instancing=x.instancing,N.instancingColor=x.instancingColor,N.instancingMorph=x.instancingMorph,N.skinning=x.skinning,N.morphTargets=x.morphTargets,N.morphNormals=x.morphNormals,N.morphColors=x.morphColors,N.morphTargetsCount=x.morphTargetsCount,N.numClippingPlanes=x.numClippingPlanes,N.numIntersection=x.numClipIntersection,N.vertexAlphas=x.vertexAlphas,N.vertexTangents=x.vertexTangents,N.toneMapping=x.toneMapping}function cr(o,x){if(o.length===0)return null;if(o.length===1)return o[0].texture!==null?o[0]:null;h.setFromMatrixPosition(x.matrixWorld);for(let N=0,L=o.length;N<L;N++){const D=o[N];if(D.texture!==null&&D.boundingBox.containsPoint(h))return D}return null}function fr(o,x,N,L,D){x.isScene!==!0&&(x=ht),B.resetTextureUnits();const fe=x.fog,pe=L.isMeshStandardMaterial||L.isMeshLambertMaterial||L.isMeshPhongMaterial?x.environment:null,le=$===null?I.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:Je.workingColorSpace,me=L.isMeshStandardMaterial||L.isMeshLambertMaterial&&!L.envMap||L.isMeshPhongMaterial&&!L.envMap,Ee=J.get(L.envMap||pe,me),De=L.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,we=!!N.attributes.tangent&&(!!L.normalMap||L.anisotropy>0),Me=!!N.morphAttributes.position,Ve=!!N.morphAttributes.normal,at=!!N.morphAttributes.color;let nt=Dt;L.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(nt=I.toneMapping);const ze=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,mt=ze!==void 0?ze.length:0,ue=w.get(L),Et=g.state.lights;if(Fe===!0&&(ye===!0||o!==ge)){const qe=o===ge&&L.id===ce;Te.setState(L,o,qe)}let Oe=!1;L.version===ue.__version?(ue.needsLights&&ue.lightsStateVersion!==Et.state.version||ue.outputColorSpace!==le||D.isBatchedMesh&&ue.batching===!1||!D.isBatchedMesh&&ue.batching===!0||D.isBatchedMesh&&ue.batchingColor===!0&&D.colorTexture===null||D.isBatchedMesh&&ue.batchingColor===!1&&D.colorTexture!==null||D.isInstancedMesh&&ue.instancing===!1||!D.isInstancedMesh&&ue.instancing===!0||D.isSkinnedMesh&&ue.skinning===!1||!D.isSkinnedMesh&&ue.skinning===!0||D.isInstancedMesh&&ue.instancingColor===!0&&D.instanceColor===null||D.isInstancedMesh&&ue.instancingColor===!1&&D.instanceColor!==null||D.isInstancedMesh&&ue.instancingMorph===!0&&D.morphTexture===null||D.isInstancedMesh&&ue.instancingMorph===!1&&D.morphTexture!==null||ue.envMap!==Ee||L.fog===!0&&ue.fog!==fe||ue.numClippingPlanes!==void 0&&(ue.numClippingPlanes!==Te.numPlanes||ue.numIntersection!==Te.numIntersection)||ue.vertexAlphas!==De||ue.vertexTangents!==we||ue.morphTargets!==Me||ue.morphNormals!==Ve||ue.morphColors!==at||ue.toneMapping!==nt||ue.morphTargetsCount!==mt||!!ue.lightProbeGrid!=g.state.lightProbeGridArray.length>0)&&(Oe=!0):(Oe=!0,ue.__version=L.version);let Tt=ue.currentProgram;Oe===!0&&(Tt=gn(L,x,D),F&&L.isNodeMaterial&&F.onUpdateProgram(L,Tt,ue));let Rt=!1,Ft=!1,Kt=!1;const Xe=Tt.getUniforms(),rt=ue.uniforms;if(a.useProgram(Tt.program)&&(Rt=!0,Ft=!0,Kt=!0),L.id!==ce&&(ce=L.id,Ft=!0),ue.needsLights){const qe=cr(g.state.lightProbeGridArray,D);ue.lightProbeGrid!==qe&&(ue.lightProbeGrid=qe,Ft=!0)}if(Rt||ge!==o){a.buffers.depth.getReversed()&&o.reversedDepth!==!0&&(o._reversedDepth=!0,o.updateProjectionMatrix()),Xe.setValue(E,"projectionMatrix",o.projectionMatrix),Xe.setValue(E,"viewMatrix",o.matrixWorldInverse);const Gt=Xe.map.cameraPosition;Gt!==void 0&&Gt.setValue(E,ct.setFromMatrixPosition(o.matrixWorld)),u.logarithmicDepthBuffer&&Xe.setValue(E,"logDepthBufFC",2/(Math.log(o.far+1)/Math.LN2)),(L.isMeshPhongMaterial||L.isMeshToonMaterial||L.isMeshLambertMaterial||L.isMeshBasicMaterial||L.isMeshStandardMaterial||L.isShaderMaterial)&&Xe.setValue(E,"isOrthographic",o.isOrthographicCamera===!0),ge!==o&&(ge=o,Ft=!0,Kt=!0)}if(ue.needsLights&&(Et.state.directionalShadowMap.length>0&&Xe.setValue(E,"directionalShadowMap",Et.state.directionalShadowMap,B),Et.state.spotShadowMap.length>0&&Xe.setValue(E,"spotShadowMap",Et.state.spotShadowMap,B),Et.state.pointShadowMap.length>0&&Xe.setValue(E,"pointShadowMap",Et.state.pointShadowMap,B)),D.isSkinnedMesh){Xe.setOptional(E,D,"bindMatrix"),Xe.setOptional(E,D,"bindMatrixInverse");const qe=D.skeleton;qe&&(qe.boneTexture===null&&qe.computeBoneTexture(),Xe.setValue(E,"boneTexture",qe.boneTexture,B))}D.isBatchedMesh&&(Xe.setOptional(E,D,"batchingTexture"),Xe.setValue(E,"batchingTexture",D._matricesTexture,B),Xe.setOptional(E,D,"batchingIdTexture"),Xe.setValue(E,"batchingIdTexture",D._indirectTexture,B),Xe.setOptional(E,D,"batchingColorTexture"),D._colorsTexture!==null&&Xe.setValue(E,"batchingColorTexture",D._colorsTexture,B));const Bt=N.morphAttributes;if((Bt.position!==void 0||Bt.normal!==void 0||Bt.color!==void 0)&&v.update(D,N,Tt),(Ft||ue.receiveShadow!==D.receiveShadow)&&(ue.receiveShadow=D.receiveShadow,Xe.setValue(E,"receiveShadow",D.receiveShadow)),(L.isMeshStandardMaterial||L.isMeshLambertMaterial||L.isMeshPhongMaterial)&&L.envMap===null&&x.environment!==null&&(rt.envMapIntensity.value=x.environmentIntensity),rt.dfgLUT!==void 0&&(rt.dfgLUT.value=Dd()),Ft){if(Xe.setValue(E,"toneMappingExposure",I.toneMappingExposure),ue.needsLights&&dr(rt,Kt),fe&&L.fog===!0&&Se.refreshFogUniforms(rt,fe),Se.refreshMaterialUniforms(rt,L,Q,te,g.state.transmissionRenderTarget[o.id]),ue.needsLights&&ue.lightProbeGrid){const qe=ue.lightProbeGrid;rt.probesSH.value=qe.texture,rt.probesMin.value.copy(qe.boundingBox.min),rt.probesMax.value.copy(qe.boundingBox.max),rt.probesResolution.value.copy(qe.resolution)}Rn.upload(E,di(ue),rt,B)}if(L.isShaderMaterial&&L.uniformsNeedUpdate===!0&&(Rn.upload(E,di(ue),rt,B),L.uniformsNeedUpdate=!1),L.isSpriteMaterial&&Xe.setValue(E,"center",D.center),Xe.setValue(E,"modelViewMatrix",D.modelViewMatrix),Xe.setValue(E,"normalMatrix",D.normalMatrix),Xe.setValue(E,"modelMatrix",D.matrixWorld),L.uniformsGroups!==void 0){const qe=L.uniformsGroups;for(let Gt=0,qt=qe.length;Gt<qt;Gt++){const pi=qe[Gt];q.update(pi,Tt),q.bind(pi,Tt)}}return Tt}function dr(o,x){o.ambientLightColor.needsUpdate=x,o.lightProbe.needsUpdate=x,o.directionalLights.needsUpdate=x,o.directionalLightShadows.needsUpdate=x,o.pointLights.needsUpdate=x,o.pointLightShadows.needsUpdate=x,o.spotLights.needsUpdate=x,o.spotLightShadows.needsUpdate=x,o.rectAreaLights.needsUpdate=x,o.hemisphereLights.needsUpdate=x}function ur(o){return o.isMeshLambertMaterial||o.isMeshToonMaterial||o.isMeshPhongMaterial||o.isMeshStandardMaterial||o.isShadowMaterial||o.isShaderMaterial&&o.lights===!0}this.getActiveCubeFace=function(){return Y},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return $},this.setRenderTargetTextures=function(o,x,N){const L=w.get(o);L.__autoAllocateDepthBuffer=o.resolveDepthBuffer===!1,L.__autoAllocateDepthBuffer===!1&&(L.__useRenderToTexture=!1),w.get(o.texture).__webglTexture=x,w.get(o.depthTexture).__webglTexture=L.__autoAllocateDepthBuffer?void 0:N,L.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(o,x){const N=w.get(o);N.__webglFramebuffer=x,N.__useDefaultFramebuffer=x===void 0},this.setRenderTarget=function(o,x=0,N=0){$=o,Y=x,V=N;let L=null,D=!1,fe=!1;if(o){const le=w.get(o);if(le.__useDefaultFramebuffer!==void 0){a.bindFramebuffer(E.FRAMEBUFFER,le.__webglFramebuffer),ve.copy(o.viewport),xe.copy(o.scissor),Ye=o.scissorTest,a.viewport(ve),a.scissor(xe),a.setScissorTest(Ye),ce=-1;return}else if(le.__webglFramebuffer===void 0)B.setupRenderTarget(o);else if(le.__hasExternalTextures)B.rebindTextures(o,w.get(o.texture).__webglTexture,w.get(o.depthTexture).__webglTexture);else if(o.depthBuffer){const De=o.depthTexture;if(le.__boundDepthTexture!==De){if(De!==null&&w.has(De)&&(o.width!==De.image.width||o.height!==De.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");B.setupDepthRenderbuffer(o)}}const me=o.texture;(me.isData3DTexture||me.isDataArrayTexture||me.isCompressedArrayTexture)&&(fe=!0);const Ee=w.get(o).__webglFramebuffer;o.isWebGLCubeRenderTarget?(Array.isArray(Ee[x])?L=Ee[x][N]:L=Ee[x],D=!0):o.samples>0&&B.useMultisampledRTT(o)===!1?L=w.get(o).__webglMultisampledFramebuffer:Array.isArray(Ee)?L=Ee[N]:L=Ee,ve.copy(o.viewport),xe.copy(o.scissor),Ye=o.scissorTest}else ve.copy(Ae).multiplyScalar(Q).floor(),xe.copy(it).multiplyScalar(Q).floor(),Ye=Ie;if(N!==0&&(L=j),a.bindFramebuffer(E.FRAMEBUFFER,L)&&a.drawBuffers(o,L),a.viewport(ve),a.scissor(xe),a.setScissorTest(Ye),D){const le=w.get(o.texture);E.framebufferTexture2D(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_CUBE_MAP_POSITIVE_X+x,le.__webglTexture,N)}else if(fe){const le=x;for(let me=0;me<o.textures.length;me++){const Ee=w.get(o.textures[me]);E.framebufferTextureLayer(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0+me,Ee.__webglTexture,N,le)}}else if(o!==null&&N!==0){const le=w.get(o.texture);E.framebufferTexture2D(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_2D,le.__webglTexture,N)}ce=-1},this.readRenderTargetPixels=function(o,x,N,L,D,fe,pe,le=0){if(!(o&&o.isWebGLRenderTarget)){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let me=w.get(o).__webglFramebuffer;if(o.isWebGLCubeRenderTarget&&pe!==void 0&&(me=me[pe]),me){a.bindFramebuffer(E.FRAMEBUFFER,me);try{const Ee=o.textures[le],De=Ee.format,we=Ee.type;if(o.textures.length>1&&E.readBuffer(E.COLOR_ATTACHMENT0+le),!u.textureFormatReadable(De)){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!u.textureTypeReadable(we)){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}x>=0&&x<=o.width-L&&N>=0&&N<=o.height-D&&E.readPixels(x,N,L,D,re.convert(De),re.convert(we),fe)}finally{const Ee=$!==null?w.get($).__webglFramebuffer:null;a.bindFramebuffer(E.FRAMEBUFFER,Ee)}}},this.readRenderTargetPixelsAsync=async function(o,x,N,L,D,fe,pe,le=0){if(!(o&&o.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let me=w.get(o).__webglFramebuffer;if(o.isWebGLCubeRenderTarget&&pe!==void 0&&(me=me[pe]),me)if(x>=0&&x<=o.width-L&&N>=0&&N<=o.height-D){a.bindFramebuffer(E.FRAMEBUFFER,me);const Ee=o.textures[le],De=Ee.format,we=Ee.type;if(o.textures.length>1&&E.readBuffer(E.COLOR_ATTACHMENT0+le),!u.textureFormatReadable(De))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!u.textureTypeReadable(we))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Me=E.createBuffer();E.bindBuffer(E.PIXEL_PACK_BUFFER,Me),E.bufferData(E.PIXEL_PACK_BUFFER,fe.byteLength,E.STREAM_READ),E.readPixels(x,N,L,D,re.convert(De),re.convert(we),0);const Ve=$!==null?w.get($).__webglFramebuffer:null;a.bindFramebuffer(E.FRAMEBUFFER,Ve);const at=E.fenceSync(E.SYNC_GPU_COMMANDS_COMPLETE,0);return E.flush(),await _r(E,at,4),E.bindBuffer(E.PIXEL_PACK_BUFFER,Me),E.getBufferSubData(E.PIXEL_PACK_BUFFER,0,fe),E.deleteBuffer(Me),E.deleteSync(at),fe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(o,x=null,N=0){const L=Math.pow(2,-N),D=Math.floor(o.image.width*L),fe=Math.floor(o.image.height*L),pe=x!==null?x.x:0,le=x!==null?x.y:0;B.setTexture2D(o,0),E.copyTexSubImage2D(E.TEXTURE_2D,N,0,0,pe,le,D,fe),a.unbindTexture()},this.copyTextureToTexture=function(o,x,N=null,L=null,D=0,fe=0){let pe,le,me,Ee,De,we,Me,Ve,at;const nt=o.isCompressedTexture?o.mipmaps[fe]:o.image;if(N!==null)pe=N.max.x-N.min.x,le=N.max.y-N.min.y,me=N.isBox3?N.max.z-N.min.z:1,Ee=N.min.x,De=N.min.y,we=N.isBox3?N.min.z:0;else{const rt=Math.pow(2,-D);pe=Math.floor(nt.width*rt),le=Math.floor(nt.height*rt),o.isDataArrayTexture?me=nt.depth:o.isData3DTexture?me=Math.floor(nt.depth*rt):me=1,Ee=0,De=0,we=0}L!==null?(Me=L.x,Ve=L.y,at=L.z):(Me=0,Ve=0,at=0);const ze=re.convert(x.format),mt=re.convert(x.type);let ue;x.isData3DTexture?(B.setTexture3D(x,0),ue=E.TEXTURE_3D):x.isDataArrayTexture||x.isCompressedArrayTexture?(B.setTexture2DArray(x,0),ue=E.TEXTURE_2D_ARRAY):(B.setTexture2D(x,0),ue=E.TEXTURE_2D),a.activeTexture(E.TEXTURE0),a.pixelStorei(E.UNPACK_FLIP_Y_WEBGL,x.flipY),a.pixelStorei(E.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),a.pixelStorei(E.UNPACK_ALIGNMENT,x.unpackAlignment);const Et=a.getParameter(E.UNPACK_ROW_LENGTH),Oe=a.getParameter(E.UNPACK_IMAGE_HEIGHT),Tt=a.getParameter(E.UNPACK_SKIP_PIXELS),Rt=a.getParameter(E.UNPACK_SKIP_ROWS),Ft=a.getParameter(E.UNPACK_SKIP_IMAGES);a.pixelStorei(E.UNPACK_ROW_LENGTH,nt.width),a.pixelStorei(E.UNPACK_IMAGE_HEIGHT,nt.height),a.pixelStorei(E.UNPACK_SKIP_PIXELS,Ee),a.pixelStorei(E.UNPACK_SKIP_ROWS,De),a.pixelStorei(E.UNPACK_SKIP_IMAGES,we);const Kt=o.isDataArrayTexture||o.isData3DTexture,Xe=x.isDataArrayTexture||x.isData3DTexture;if(o.isDepthTexture){const rt=w.get(o),Bt=w.get(x),qe=w.get(rt.__renderTarget),Gt=w.get(Bt.__renderTarget);a.bindFramebuffer(E.READ_FRAMEBUFFER,qe.__webglFramebuffer),a.bindFramebuffer(E.DRAW_FRAMEBUFFER,Gt.__webglFramebuffer);for(let qt=0;qt<me;qt++)Kt&&(E.framebufferTextureLayer(E.READ_FRAMEBUFFER,E.COLOR_ATTACHMENT0,w.get(o).__webglTexture,D,we+qt),E.framebufferTextureLayer(E.DRAW_FRAMEBUFFER,E.COLOR_ATTACHMENT0,w.get(x).__webglTexture,fe,at+qt)),E.blitFramebuffer(Ee,De,pe,le,Me,Ve,pe,le,E.DEPTH_BUFFER_BIT,E.NEAREST);a.bindFramebuffer(E.READ_FRAMEBUFFER,null),a.bindFramebuffer(E.DRAW_FRAMEBUFFER,null)}else if(D!==0||o.isRenderTargetTexture||w.has(o)){const rt=w.get(o),Bt=w.get(x);a.bindFramebuffer(E.READ_FRAMEBUFFER,Z),a.bindFramebuffer(E.DRAW_FRAMEBUFFER,W);for(let qe=0;qe<me;qe++)Kt?E.framebufferTextureLayer(E.READ_FRAMEBUFFER,E.COLOR_ATTACHMENT0,rt.__webglTexture,D,we+qe):E.framebufferTexture2D(E.READ_FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_2D,rt.__webglTexture,D),Xe?E.framebufferTextureLayer(E.DRAW_FRAMEBUFFER,E.COLOR_ATTACHMENT0,Bt.__webglTexture,fe,at+qe):E.framebufferTexture2D(E.DRAW_FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_2D,Bt.__webglTexture,fe),D!==0?E.blitFramebuffer(Ee,De,pe,le,Me,Ve,pe,le,E.COLOR_BUFFER_BIT,E.NEAREST):Xe?E.copyTexSubImage3D(ue,fe,Me,Ve,at+qe,Ee,De,pe,le):E.copyTexSubImage2D(ue,fe,Me,Ve,Ee,De,pe,le);a.bindFramebuffer(E.READ_FRAMEBUFFER,null),a.bindFramebuffer(E.DRAW_FRAMEBUFFER,null)}else Xe?o.isDataTexture||o.isData3DTexture?E.texSubImage3D(ue,fe,Me,Ve,at,pe,le,me,ze,mt,nt.data):x.isCompressedArrayTexture?E.compressedTexSubImage3D(ue,fe,Me,Ve,at,pe,le,me,ze,nt.data):E.texSubImage3D(ue,fe,Me,Ve,at,pe,le,me,ze,mt,nt):o.isDataTexture?E.texSubImage2D(E.TEXTURE_2D,fe,Me,Ve,pe,le,ze,mt,nt.data):o.isCompressedTexture?E.compressedTexSubImage2D(E.TEXTURE_2D,fe,Me,Ve,nt.width,nt.height,ze,nt.data):E.texSubImage2D(E.TEXTURE_2D,fe,Me,Ve,pe,le,ze,mt,nt);a.pixelStorei(E.UNPACK_ROW_LENGTH,Et),a.pixelStorei(E.UNPACK_IMAGE_HEIGHT,Oe),a.pixelStorei(E.UNPACK_SKIP_PIXELS,Tt),a.pixelStorei(E.UNPACK_SKIP_ROWS,Rt),a.pixelStorei(E.UNPACK_SKIP_IMAGES,Ft),fe===0&&x.generateMipmaps&&E.generateMipmap(ue),a.unbindTexture()},this.initRenderTarget=function(o){w.get(o).__webglFramebuffer===void 0&&B.setupRenderTarget(o)},this.initTexture=function(o){o.isCubeTexture?B.setTextureCube(o,0):o.isData3DTexture?B.setTexture3D(o,0):o.isDataArrayTexture||o.isCompressedArrayTexture?B.setTexture2DArray(o,0):B.setTexture2D(o,0),a.unbindTexture()},this.resetState=function(){Y=0,V=0,$=null,a.reset(),de.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return mi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(n){this._outputColorSpace=n;const t=this.getContext();t.drawingBufferColorSpace=Je._getDrawingBufferColorSpace(n),t.unpackColorSpace=Je._getUnpackColorSpace()}}const Ra={type:"change"},ai={type:"start"},rr={type:"end"},xn=new No,Ca=new Da,Ud=Math.cos(70*yo.DEG2RAD),ft=new Ce,gt=2*Math.PI,ke={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},qn=1e-6;class Yd extends Io{constructor(n,t=null){super(n,t),this.state=ke.NONE,this.target=new Ce,this.cursor=new Ce,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:en.ROTATE,MIDDLE:en.DOLLY,RIGHT:en.PAN},this.touches={ONE:Jt.ROTATE,TWO:Jt.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new Ce,this._lastQuaternion=new ta,this._lastTargetPosition=new Ce,this._quat=new ta().setFromUnitVectors(n.up,new Ce(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new na,this._sphericalDelta=new na,this._scale=1,this._panOffset=new Ce,this._rotateStart=new je,this._rotateEnd=new je,this._rotateDelta=new je,this._panStart=new je,this._panEnd=new je,this._panDelta=new je,this._dollyStart=new je,this._dollyEnd=new je,this._dollyDelta=new je,this._dollyDirection=new Ce,this._mouse=new je,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Id.bind(this),this._onPointerDown=wd.bind(this),this._onPointerUp=Nd.bind(this),this._onContextMenu=Vd.bind(this),this._onMouseWheel=Fd.bind(this),this._onKeyDown=Bd.bind(this),this._onTouchStart=Gd.bind(this),this._onTouchMove=Hd.bind(this),this._onMouseDown=yd.bind(this),this._onMouseMove=Od.bind(this),this._interceptControlDown=kd.bind(this),this._interceptControlUp=Wd.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(n){this._cursorStyle=n,n==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(n){super.connect(n),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(n){n.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=n}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Ra),this.update(),this.state=ke.NONE}pan(n,t){this._pan(n,t),this.update()}dollyIn(n){this._dollyIn(n),this.update()}dollyOut(n){this._dollyOut(n),this.update()}rotateLeft(n){this._rotateLeft(n),this.update()}rotateUp(n){this._rotateUp(n),this.update()}update(n=null){const t=this.object.position;ft.copy(t).sub(this.target),ft.applyQuaternion(this._quat),this._spherical.setFromVector3(ft),this.autoRotate&&this.state===ke.NONE&&this._rotateLeft(this._getAutoRotationAngle(n)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=gt:i>Math.PI&&(i-=gt),s<-Math.PI?s+=gt:s>Math.PI&&(s-=gt),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const f=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=f!=this._spherical.radius}if(ft.setFromSpherical(this._spherical),ft.applyQuaternion(this._quatInverse),t.copy(this.target).add(ft),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let f=null;if(this.object.isPerspectiveCamera){const m=ft.length();f=this._clampDistance(m*this._scale);const b=m-f;this.object.position.addScaledVector(this._dollyDirection,b),this.object.updateMatrixWorld(),r=!!b}else if(this.object.isOrthographicCamera){const m=new Ce(this._mouse.x,this._mouse.y,0);m.unproject(this.object);const b=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=b!==this.object.zoom;const M=new Ce(this._mouse.x,this._mouse.y,0);M.unproject(this.object),this.object.position.sub(M).add(m),this.object.updateMatrixWorld(),f=ft.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;f!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(f).add(this.object.position):(xn.origin.copy(this.object.position),xn.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(xn.direction))<Ud?this.object.lookAt(this.target):(Ca.setFromNormalAndCoplanarPoint(this.object.up,this.target),xn.intersectPlane(Ca,this.target))))}else if(this.object.isOrthographicCamera){const f=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),f!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>qn||8*(1-this._lastQuaternion.dot(this.object.quaternion))>qn||this._lastTargetPosition.distanceToSquared(this.target)>qn?(this.dispatchEvent(Ra),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(n){return n!==null?gt/60*this.autoRotateSpeed*n:gt/60/60*this.autoRotateSpeed}_getZoomScale(n){const t=Math.abs(n*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(n){this._sphericalDelta.theta-=n}_rotateUp(n){this._sphericalDelta.phi-=n}_panLeft(n,t){ft.setFromMatrixColumn(t,0),ft.multiplyScalar(-n),this._panOffset.add(ft)}_panUp(n,t){this.screenSpacePanning===!0?ft.setFromMatrixColumn(t,1):(ft.setFromMatrixColumn(t,0),ft.crossVectors(this.object.up,ft)),ft.multiplyScalar(n),this._panOffset.add(ft)}_pan(n,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;ft.copy(s).sub(this.target);let r=ft.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*n*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(n*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(n){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=n:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(n){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=n:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(n,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=n-i.left,r=t-i.top,f=i.width,m=i.height;this._mouse.x=s/f*2-1,this._mouse.y=-(r/m)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(n){return Math.max(this.minDistance,Math.min(this.maxDistance,n))}_handleMouseDownRotate(n){this._rotateStart.set(n.clientX,n.clientY)}_handleMouseDownDolly(n){this._updateZoomParameters(n.clientX,n.clientX),this._dollyStart.set(n.clientX,n.clientY)}_handleMouseDownPan(n){this._panStart.set(n.clientX,n.clientY)}_handleMouseMoveRotate(n){this._rotateEnd.set(n.clientX,n.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(gt*this._rotateDelta.x/t.clientHeight),this._rotateUp(gt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(n){this._dollyEnd.set(n.clientX,n.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(n){this._panEnd.set(n.clientX,n.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(n){this._updateZoomParameters(n.clientX,n.clientY),n.deltaY<0?this._dollyIn(this._getZoomScale(n.deltaY)):n.deltaY>0&&this._dollyOut(this._getZoomScale(n.deltaY)),this.update()}_handleKeyDown(n){let t=!1;switch(n.code){case this.keys.UP:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateUp(gt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateUp(-gt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateLeft(gt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateLeft(-gt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(n.preventDefault(),this.update())}_handleTouchStartRotate(n){if(this._pointers.length===1)this._rotateStart.set(n.pageX,n.pageY);else{const t=this._getSecondPointerPosition(n),i=.5*(n.pageX+t.x),s=.5*(n.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(n){if(this._pointers.length===1)this._panStart.set(n.pageX,n.pageY);else{const t=this._getSecondPointerPosition(n),i=.5*(n.pageX+t.x),s=.5*(n.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(n){const t=this._getSecondPointerPosition(n),i=n.pageX-t.x,s=n.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(n){this.enableZoom&&this._handleTouchStartDolly(n),this.enablePan&&this._handleTouchStartPan(n)}_handleTouchStartDollyRotate(n){this.enableZoom&&this._handleTouchStartDolly(n),this.enableRotate&&this._handleTouchStartRotate(n)}_handleTouchMoveRotate(n){if(this._pointers.length==1)this._rotateEnd.set(n.pageX,n.pageY);else{const i=this._getSecondPointerPosition(n),s=.5*(n.pageX+i.x),r=.5*(n.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(gt*this._rotateDelta.x/t.clientHeight),this._rotateUp(gt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(n){if(this._pointers.length===1)this._panEnd.set(n.pageX,n.pageY);else{const t=this._getSecondPointerPosition(n),i=.5*(n.pageX+t.x),s=.5*(n.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(n){const t=this._getSecondPointerPosition(n),i=n.pageX-t.x,s=n.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const f=(n.pageX+t.x)*.5,m=(n.pageY+t.y)*.5;this._updateZoomParameters(f,m)}_handleTouchMoveDollyPan(n){this.enableZoom&&this._handleTouchMoveDolly(n),this.enablePan&&this._handleTouchMovePan(n)}_handleTouchMoveDollyRotate(n){this.enableZoom&&this._handleTouchMoveDolly(n),this.enableRotate&&this._handleTouchMoveRotate(n)}_addPointer(n){this._pointers.push(n.pointerId)}_removePointer(n){delete this._pointerPositions[n.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==n.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(n){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==n.pointerId)return!0;return!1}_trackPointer(n){let t=this._pointerPositions[n.pointerId];t===void 0&&(t=new je,this._pointerPositions[n.pointerId]=t),t.set(n.pageX,n.pageY)}_getSecondPointerPosition(n){const t=n.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(n){const t=n.deltaMode,i={clientX:n.clientX,clientY:n.clientY,deltaY:n.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return n.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function wd(e){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(e.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(e)&&(this._addPointer(e),e.pointerType==="touch"?this._onTouchStart(e):this._onMouseDown(e),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Id(e){this.enabled!==!1&&(e.pointerType==="touch"?this._onTouchMove(e):this._onMouseMove(e))}function Nd(e){switch(this._removePointer(e),this._pointers.length){case 0:this.domElement.releasePointerCapture(e.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(rr),this.state=ke.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const n=this._pointers[0],t=this._pointerPositions[n];this._onTouchStart({pointerId:n,pageX:t.x,pageY:t.y});break}}function yd(e){let n;switch(e.button){case 0:n=this.mouseButtons.LEFT;break;case 1:n=this.mouseButtons.MIDDLE;break;case 2:n=this.mouseButtons.RIGHT;break;default:n=-1}switch(n){case en.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(e),this.state=ke.DOLLY;break;case en.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=ke.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=ke.ROTATE}break;case en.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=ke.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=ke.PAN}break;default:this.state=ke.NONE}this.state!==ke.NONE&&this.dispatchEvent(ai)}function Od(e){switch(this.state){case ke.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(e);break;case ke.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(e);break;case ke.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(e);break}}function Fd(e){this.enabled===!1||this.enableZoom===!1||this.state!==ke.NONE||(e.preventDefault(),this.dispatchEvent(ai),this._handleMouseWheel(this._customWheelEvent(e)),this.dispatchEvent(rr))}function Bd(e){this.enabled!==!1&&this._handleKeyDown(e)}function Gd(e){switch(this._trackPointer(e),this._pointers.length){case 1:switch(this.touches.ONE){case Jt.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(e),this.state=ke.TOUCH_ROTATE;break;case Jt.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(e),this.state=ke.TOUCH_PAN;break;default:this.state=ke.NONE}break;case 2:switch(this.touches.TWO){case Jt.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(e),this.state=ke.TOUCH_DOLLY_PAN;break;case Jt.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(e),this.state=ke.TOUCH_DOLLY_ROTATE;break;default:this.state=ke.NONE}break;default:this.state=ke.NONE}this.state!==ke.NONE&&this.dispatchEvent(ai)}function Hd(e){switch(this._trackPointer(e),this.state){case ke.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(e),this.update();break;case ke.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(e),this.update();break;case ke.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(e),this.update();break;case ke.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(e),this.update();break;default:this.state=ke.NONE}}function Vd(e){this.enabled!==!1&&e.preventDefault()}function kd(e){e.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Wd(e){e.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}export{Yd as O,Xd as W};
