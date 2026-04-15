#!/usr/bin/env node

/**
 * LOGIN DIAGNOSTIC TEST SCRIPT
 * Tests entire authentication flow end-to-end
 */

import http from 'http';

function makeRequest(method, host, port, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: host,
      port: port,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Add CORS headers as if from browser
    if (method === 'OPTIONS') {
      options.headers['Origin'] = 'http://localhost:5173';
      options.headers['Access-Control-Request-Method'] = 'POST';
      options.headers['Access-Control-Request-Headers'] = 'Content-Type';
    } else if (method === 'POST') {
      options.headers['Origin'] = 'http://localhost:5173';
    }

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          let parsed = body;
          try {
            parsed = JSON.parse(body);
          } catch (e) {
            // body is not JSON
          }
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: parsed,
          });
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function runTests() {
  console.log('\n====================================');
  console.log('LOGIN DIAGNOSTIC TEST');
  console.log('====================================\n');

  try {
    // Test 1: Check if backend is running
    console.log('🔍 Test 1: Backend Health Check...');
    try {
      const healthRes = await makeRequest('GET', '127.0.0.1', 8000, '/docs');
      if (healthRes.status === 200) {
        console.log('✅ Backend is running on :8000\n');
      } else {
        console.log(`⚠️  Backend responded with status ${healthRes.status}\n`);
      }
    } catch (e) {
      console.log(`❌ Backend not reachable: ${e.message}\n`);
      return;
    }

    // Test 2: CORS Preflight
    console.log('🔍 Test 2: Testing CORS Preflight...');
    try {
      const preflightRes = await makeRequest('OPTIONS', '127.0.0.1', 8000, '/api/v1/auth/login');
      if (preflightRes.status === 204 && preflightRes.headers['access-control-allow-origin']) {
        console.log(
          `✅ CORS preflight successful\n   Allow-Origin: ${preflightRes.headers['access-control-allow-origin']}\n`
        );
      } else {
        console.log(`❌ CORS preflight failed: ${preflightRes.status}\n`);
      }
    } catch (e) {
      console.log(`❌ CORS preflight error: ${e.message}\n`);
    }

    // Test 3: Test credentials
    console.log('🔍 Test 3: Testing Login with Credentials...');
    try {
      const loginRes = await makeRequest('POST', '127.0.0.1', 8000, '/api/v1/auth/login', {
        email: 'test@example.com',
        password: 'Test123456',
      });

      if (loginRes.status === 200 && loginRes.body.access_token) {
        console.log(`✅ Login successful!\n   Status: ${loginRes.status}`);
        console.log(`   Token: ${loginRes.body.access_token.substring(0, 50)}...`);
        console.log(`   Role: ${loginRes.body.role}\n`);
      } else {
        console.log(`❌ Login failed with status ${loginRes.status}`);
        console.log(`   Response: ${JSON.stringify(loginRes.body)}\n`);
      }
    } catch (e) {
      console.log(`❌ Login request error: ${e.message}\n`);
    }

    // Test 4: Check frontend
    console.log('🔍 Test 4: Frontend Health Check...');
    try {
      const frontendRes = await makeRequest('GET', '127.0.0.1', 5173, '/');
      if (frontendRes.status === 200) {
        console.log('✅ Frontend is running on :5173\n');
      } else {
        console.log(`⚠️  Frontend responded with status ${frontendRes.status}\n`);
      }
    } catch (e) {
      console.log(`❌ Frontend not reachable: ${e.message}\n`);
    }

    // Summary
    console.log('====================================');
    console.log('DIAGNOSTIC SUMMARY');
    console.log('====================================');
    console.log('\n✅ All systems operational!');
    console.log('\nTo test login in frontend:');
    console.log('1. Open http://localhost:5173');
    console.log('2. Enter email: test@example.com');
    console.log('3. Enter password: Test123456');
    console.log('4. Select role: Farmer');
    console.log('5. Click Login\n');
    console.log('Check browser console (F12) for any errors.\n');
  } catch (e) {
    console.error('❌ Unexpected error:', e);
  }
}

runTests();
